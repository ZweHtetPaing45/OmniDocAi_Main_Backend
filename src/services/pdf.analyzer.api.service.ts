import axios from "axios";
import FormData from "form-data";
import { AppError } from "../application/errors/app-error";
import { createLogger } from "../infrastructure/logger/create-logger";
import { PageInput } from "../application/dto/pdf.analysis/pdf.analysis.dto";
import { env } from "../config/env";

const logger = createLogger();

const base_url = env.PDF_ANALYZER_URL;


export const uploadPdfAnalysis = async (file: Express.Multer.File,pages : PageInput[])=>{

    const form = new FormData();
    form.append("file",file.buffer,{filename: file.originalname,contentType: file.mimetype});
    form.append("pages",JSON.stringify(pages));
    
    try{
        
        const res = await axios.post(`${base_url}/api/v1/pdf/classify`,form,{headers: form.getHeaders()});

        return res.data;
        
    }catch(error){
        logger.error("Upload Pdf analyzer Error",error);
        throw new AppError("Upload Pdf analyzer Error",400);
    }
}