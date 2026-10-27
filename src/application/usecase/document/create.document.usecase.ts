import { RequestCreateDocumentDataDTO } from "../../dto/document/request.create.document.dto";
import { DocumentRepository } from "../../interface/repositories/document/i-document-repository";
import { uploadImage } from "../../../services/pdf.service";
import { DocumentPageRepository } from "../../interface/repositories/document.page/document.page.repository";
import { RequestCreateDocumentPageDTO } from "../../dto/document.page/create.document.page.dto";



export class CreateDocumentUseCase{

    constructor(
        private documentRepository : DocumentRepository,
        private documentPageRepository : DocumentPageRepository
    ){}

    async execute(data : {file: Express.Multer.File,user_id : number,title : string,file_name : string}){

        let imageResult;

        if(data.file){

            // console.log('File UseCase',data.file);

            imageResult = await uploadImage(data.file);

            // console.log("image Result",imageResult.result);

        }

        const images = imageResult.result.images.images;

        const image_delete_ids = images
        .map((image: string) => {
        const parts : any = image.split("/").filter(Boolean);

        if (parts.length < 2) {
            return null;
        }

        const fileName = parts.at(-1);
        const folder = parts.at(-2);

        if (!fileName || !folder) {
            return null;
        }

        return  `${folder}/${fileName}`;

    }).filter((id : any): id is string => id !== null);

        // console.log(image_delete_ids);

        // console.log("file_path",imageResult.result.images.uploadPdf);

        const createDocument : RequestCreateDocumentDataDTO ={
            user_id : data.user_id,
            title : data.title,
            file_name : data.file_name,
            file_path : imageResult.result.images.uploadPdf,
            total_pages : imageResult.result.totalPages
        }

        const result : any = await this.documentRepository.create(createDocument);

        const document_id  = result.id;

        const pages : RequestCreateDocumentPageDTO[] = images.map((image: string,index: number)=>{
            return {
                page_number : index + 1,
                content : null,
                pdf_image_url : image,
                pdf_delete_id : image_delete_ids[index]
            }
        });

        // console.log("Document Pages",pages);

        await this.documentPageRepository.createMany(document_id,pages);


        return {
            document_id,
            title: data.title,
            file_name : data.file_name,
            file_path: imageResult.result.images.uploadPdf,
            total_pages: imageResult.result.totalPages,
            pages
        }

    }

}