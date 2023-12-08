import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { courseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseInDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingPayload } = payload;

  const session = await Course.startSession();

  try {
    session.startTransaction();

    let returnData = {};

    const updateBasicInfo = await Course.findByIdAndUpdate(
      id,
      remainingPayload,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    returnData = {
      ...returnData,
      updateBasicInfo,
    };

    //   Check if preRequisiteCourses is present in payload for update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        ?.map((el) => el.course);
      const addedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && !el.isDeleted)
        ?.map((el) => el.course);

      // Remove deleted preRequisiteCourses
      const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletePreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // Add new preRequisiteCourses
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: addedPreRequisites },
          },
        },

        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      returnData = {
        ...returnData,
        newPreRequisiteCourses,
        deletePreRequisiteCourses,
      };
    }

    await session.commitTransaction();
    session.endSession();

    return returnData;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  return result;
};

const assignFacultiesToCourseInDB = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    courseId,
    {
      $addToSet: {
        faculties: { $each: payload.faculties },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseInDB,
  deleteCourseFromDB,
  assignFacultiesToCourseInDB,
};
