import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getFacultiesFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculties fetched successfully',
    data: result,
  });
});


const getSinglegetFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty fetched successfully',
      data: result,
    });
})

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated succesfully',
    data: result,
  });
});


const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await FacultyServices.deleteFacultyFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty deleted successfully',
      data: result,
    })
})

export const FacultyController = {
  getFaculties,
  getSinglegetFaculty,
  updateFaculty,
  deleteFaculty,
};
