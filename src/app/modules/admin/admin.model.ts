import { Schema, model } from 'mongoose';
import { TUserName } from '../user/user.interface';
import { AdminModel, TAdmin } from './admin.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
    minlength: [1, 'First name can not be less than 1 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: 'First name must be capitalized',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [20, 'Last name can not be more than 20 characters'],
    minlength: [1, 'Last name can not be less than 1 characters'],
  },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'Student Id is required'],
      trim: true,
      unique: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      unique: true,
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },

    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'Gender {VALUE} is not supported',
      },
      required: [true, 'Gender is required'],
    },

    dateOfBirth: {
      type: String,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },

    contactNo: {
      type: String,
      required: [true, 'Phone is required'],
    },

    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency phone is required'],
    },

    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message: 'Blood group {VALUE} is not supported',
      },
    },

    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },

    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },

    profilePicture: { type: String },

    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'Management department is required'],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

// Query middleware / hook : will run before find
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Virtual property
adminSchema.virtual('fullName').get(function () {
  return this?.name
    ? `${this?.name?.firstName} ${this?.name?.middleName ? this?.name?.middleName + ' ' : ''}${this?.name?.lastName}`
    : '';
});

// Create a custom static method
adminSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
