import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const getAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admins fetched successfully',
    data: result,
  });
});


const getSingleAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(adminId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin fetched successfully',
      data: result,
    });
})

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(adminId, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  });
});


const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
    const { adminId } = req.params;

    const result = await AdminServices.deleteAdminFromDB(adminId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin deleted successfully',
      data: result,
    })
})

export const AdminController = {
  getAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
