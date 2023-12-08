import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';

const preRequisiteCourseSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  }, {
    _id: false,
  }
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: [true, 'Course prefix is required'],
      trim: true,
    },
    code: {
      type: Number,
      required: [true, 'Course code is required'],
      trim: true,
    },
    credits: {
      type: Number,
      required: [true, 'Course credits is required'],
      trim: true,
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', courseSchema);
