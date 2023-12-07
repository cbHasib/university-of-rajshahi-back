import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
    minlength: [1, 'First name can not be less than 1 characters'],
    validate: {
      validator:function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: 'First name must be capitalized'
    }
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

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true
  },
  fatherPhone: {
    type: String,
    required: [true, 'Father phone is required'],
    trim: true
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
    trim: true
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true
  },
  motherPhone: {
    type: String,
    required: [true, 'Mother phone is required'],
    trim: true
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
    trim: true
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
    trim: true
  },
  relation: {
    type: String,
    required: [true, 'Local guardian relation is required'],
    trim: true
  },

  phone: {
    type: String,
    required: [true, 'Local guardian phone is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
    trim: true
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
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

    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian is required'],
    },

    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian is required'],
    },

    profilePicture: { type: String },

    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
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
      virtuals: true
    },
  },
);




// Query middleware / hook : will run before find
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
})

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
})




// Virtual property
studentSchema.virtual('fullName').get(function () {
  return this?.name ? `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}` : '';
});







// Create a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
}



export const Student = model<TStudent, StudentModel>('Student', studentSchema);
