import { Request,Response,NextFunction } from "express";
import { GetAllDocumentPageUseCase } from "../../../../../application/usecase/document-page/get-all-document-page.usecase";
import { GetDocumentPageUseCase } from "../../../../../application/usecase/document-page/get-document-page.usecase";
import { AppError } from "../../../../../application/errors/app-error";
import { UpdateContentDocumentPageUseCase } from "../../../../../application/usecase/document-page/update-content-document-page.usecase";
import { UpdateDocumentPageDTO } from "../../../../../application/dto/document.page/update-documet-page.dto";


export class DocumentPageController{

    constructor(
        private getAllDocumentPageUseCase : GetAllDocumentPageUseCase,
        private getDocumentPageUseCase : GetDocumentPageUseCase,
        private updateContentDocumentPageUseCase : UpdateContentDocumentPageUseCase
    ){}


    async getAllList(req:Request,res:Response,next:NextFunction){

        try{

            const user = (req as any).user;

            const user_id = user.id;

            const result = await this.getAllDocumentPageUseCase.execute(user_id);

            res.status(200).json({
                result
            });

        }catch(error){
            next(error);
        }

    }

    async getDocumentPage(req:Request,res:Response,next:NextFunction){

        try{

            const user = (req as any).user;

            const user_id = user.id;

            const document_id = Number(req.params.documentId);

            const result = await this.getDocumentPageUseCase.execute(user_id,document_id);

            res.status(200).json({
                message : "Document Pdf",
                result
            });

        }catch(error){
            next(error);
        }

    }

    async updateContent(req:Request,res:Response,next:NextFunction){

        try{

            const user = (req as any).user;
            
            const user_id = user.id;

            const page_id = (req as any).params.page_id;

            const {content} = req.body;

            if(!page_id || !content || !user_id){
                throw new AppError("Enter the Data",400);
            }

            const data : UpdateDocumentPageDTO = {
                user_id,
                page_id,
                content
            }

            console.log(data);

            await this.updateContentDocumentPageUseCase.execute(data);

            res.status(201).json({
                success: true,
                message : "Update Content Successfully"
            })

        }catch(error){
            next(error);
        }

    }
}