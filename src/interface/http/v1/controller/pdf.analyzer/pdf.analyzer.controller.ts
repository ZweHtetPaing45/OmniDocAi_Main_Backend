import {Request,Response,NextFunction} from 'express';
import { PdfAnalyzerUseCase } from '../../../../../application/usecase/pdf.analyzer/pdf.analyzer.usecase';
import { AppError } from '../../../../../application/errors/app-error';
import { PageInput } from '../../../../../application/dto/pdf.analysis/pdf.analysis.dto';

export class PdfAnalyzerController{

    constructor(
        private pdfAnalyzerUseCase : PdfAnalyzerUseCase
    ){}

    async uploadPdf(req:Request,res:Response,next:NextFunction){

        try{

            const file = req.file;

            const user = (req as any).user;
            
            const pages: PageInput[] = typeof req.body.pages === 'string'? JSON.parse(req.body.pages): req.body.pages;

            console.log("pages controller",pages);

            if (!file) {
                throw new Error('PDF file is required');
            }

            const result = await this.pdfAnalyzerUseCase.execute(file,pages,user.id);

            res.status(201).json({
                success: true,
                message: 'pdf change text successfully',
                result : result
            });

        }catch(error){
            next(error);
        }

    }

}