import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { systemconfigService } from "./SystemConfig.service";

//get system config
const getSystemConfig = catchAsync(async (req: Request, res: Response) => {
    const result = await systemconfigService.getSystemConfig();
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "SystemConfig created successfully",
        data: result,
    });
});

const updateSystemConfig = catchAsync(async (req: Request, res: Response) => {
    const result = await systemconfigService.updateSystemConfig( req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "SystemConfig updated successfully",
        data: result,
    });
});



export const systemconfigController = {
  

    updateSystemConfig,

    getSystemConfig
};
