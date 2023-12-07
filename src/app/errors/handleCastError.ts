import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError) : TGenericErrorResponse=> {
    const message = `Invalid ${err.path}: ${err.value}`;
    return {
        statusCode: 400,
        message: message,
        errorSource: [{
            path: err?.path,
            message: err?.message,
        }]
    }
}

export default handleCastError;