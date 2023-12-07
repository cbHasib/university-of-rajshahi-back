import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError) : TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSource: err.issues.map((issue:ZodIssue) => {
      return {
        // path: issue.path.join('.'),
        path: issue?.path[issue?.path.length - 1],
        message: issue.code,
      };
    }),
  };
};

export default handleZodError;
