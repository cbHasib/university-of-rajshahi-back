import httpStatus from "http-status";
import { TGenericErrorResponse } from "../interface/error";
import { JsonWebTokenError } from "jsonwebtoken";

const handleJwtError = (err: JsonWebTokenError) : TGenericErrorResponse=> {
    
    const message = err?.name === 'TokenExpiredError' ? 'Your token has been expired.' : 'Your token is invalid.';

    return {
        statusCode: httpStatus.UNAUTHORIZED,
        message,
        errorSource: [{
            path: '',
            message: err?.message
        }]
    }
}

export default handleJwtError;