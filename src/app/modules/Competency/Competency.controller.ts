import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { competencyService } from "./Competency.service";

const createCompetency = catchAsync(async (req: Request, res: Response) => {
    const result = await competencyService.createCompetency(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Competency created successfully",
        data: result,
    });
});

const getAllCompetencys = catchAsync(async (req: Request, res: Response) => {
    const results = await competencyService.getAllCompetencys(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Competencys retrieved successfully",
        data: results,
    });
});

const getSingleCompetency = catchAsync(async (req: Request, res: Response) => {
    const result = await competencyService.getSingleCompetency(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Competency retrieved successfully",
        data: result,
    });
});

const updateCompetency = catchAsync(async (req: Request, res: Response) => {
    const result = await competencyService.updateCompetency(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Competency updated successfully",
        data: result,
    });
});

const deleteCompetency = catchAsync(async (req: Request, res: Response) => {
    const result = await competencyService.deleteCompetency(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Competency deleted successfully",
        data: result,
    });
});

export const competencyController = {
    createCompetency,
    getAllCompetencys,
    getSingleCompetency,
    updateCompetency,
    deleteCompetency,
};
