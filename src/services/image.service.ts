import axios from "axios";
import FormData from "form-data";
import { AppError } from "../application/errors/app-error";
import { createLogger } from "../infrastructure/logger/create-logger";

const logger = createLogger();

const base_url = "http://localhost:3000";

//Upload
export const uploadImage = async (file: Express.Multer.File,folder: string = "")=>{

    const form = new FormData();
    form.append("file",file.buffer,{filename: file.originalname,contentType: file.mimetype});
    form.append("folder",folder);

    try{

        const res = await axios.post(`${base_url}/api/upload`,form,{headers: form.getHeaders()});

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