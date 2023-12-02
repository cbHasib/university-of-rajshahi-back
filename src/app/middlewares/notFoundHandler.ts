import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: `API Route not found in the server`,
        error: { 
            code: httpStatus.NOT_FOUND,
            details: "API Does not exist" + req.originalUrl 
        }
    });
}

export default notFoundHandler;