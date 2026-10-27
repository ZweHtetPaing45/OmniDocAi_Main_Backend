import { Request,Response,NextFunction } from "express";
import { CreateDocumentUseCase } from "../../../../../application/usecase/document/create.document.usecase";
import { RequestCreateDocumentDataDTO } from "../../../../../application/dto/document/request.create.document.dto";
import { AppError } from "../../../../../application/errors/app-error";



export class DocumentController{

    constructor(
        private createDocumentUseCase: CreateDocumentUseCase
    ){}

    async create(req:Request,res:Response,next:NextFunction){

        try{

            const user = (req as any).user;

            const user_id = user.id;

            const file = req.file;

            const {title} = req.body;

            if(!file)throw new AppError("File is required", 400);

            console.log("file originalName",file.originalname);
            console.log("file path",req.file?.path);
            
            const data  = {
                file,
                user_id,
                title,
                file_name : file.originalname,
            };

            const result = await this.createDocumentUseCase.execute(data);

            res.status(201).json({
                message : "pdf file upload successfully",
                result
            })

        }catch(error){
            next(error);
        }

    }

}