// Certificate.controller: Module file for the Certificate.controller functionality.
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CertificateService } from "./Certificate.service";

const createCertificate = catchAsync(async (req: Request, res: Response) => {
  const result = await CertificateService.generateCertificate(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Certificate created successfully",
    data: result,
  });
});

//getCertificateById
const getCertificateById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CertificateService.getCertificateById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Certificate retrieved successfully",
    data: result,
  });
});

//getCertificatesByUser
const getCertificatesByUser = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await CertificateService.getCertificatesByUser(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Certificates retrieved successfully",
      data: result,
    });
  }
);

//getActiveCertificates
const getActiveCertificates = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CertificateService.getActiveCertificates();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Certificates retrieved successfully",
      data: result,
    });
  }
);

//updateCertificate
const updateCertificate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CertificateService.updateCertificate(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Certificate updated successfully",
    data: result,
  });
});

//deleteCertificate
const deleteCertificate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CertificateService.deleteCertificate(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Certificate deleted successfully",
    data: result,
  });
});

//getCertificateStats
const getCertificateStats = catchAsync(async (req: Request, res: Response) => {
  const result = await CertificateService.getCertificateStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Certificate statistics retrieved successfully",
    data: result,
  });
});

export const certificateController = {
  createCertificate,
  getCertificateById,
  getCertificatesByUser,
  getActiveCertificates,
  updateCertificate,
  deleteCertificate,
  getCertificateStats,
};