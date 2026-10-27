import axios from "axios";
import FormData from "form-data";
import { AppError } from "../application/errors/app-error";
import { createLogger } from "../infrastructure/logger/create-logger";
import { env } from "../config/env";

const logger = createLogger();

//http://38.60.244.126:3000

const base_url = env.PDF_SERVICE_URL;

//Upload
export const uploadImage = async (file: Express.Multer.File)=>{

    const form = new FormData();
    form.append("pdf",file.buffer,{filename: file.originalname,contentType: file.mimetype});
    
    try{

        const res = await axios.post(`${base_url}/api/v1/pdf/upload`,form,{headers: form.getHeaders()});

        return res.data;
        
    }catch(error){
        logger.error("Upload Image Error",error);
        throw new AppError("Upload Image Error",400);
    }

}

//Delete
export const deleteImage = async (folder: string,id: string)=>{
    const res = await axios.delete(`${base_url}/api/delete/${folder}/${id}`);

    return res.data;
}