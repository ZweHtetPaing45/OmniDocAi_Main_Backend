import { AppError } from "../../../../application/errors/app-error";
import { createLogger } from "../../../../infrastructure/logger/create-logger";

const logger = createLogger();

export function errorHandler(err: any, req: any,res: any,next: any){
    
    if(err instanceof AppError){
        logger.error("AppError occured",{
            message: err.message,
            statusCode: err.statusCode
        });
    

    return res.status(err.statusCode).json({
        message: err.message
    });
}

    logger.error("Unknown error",err);

    return res.status(500).json({
        message: "interface Server Error"
    });
}