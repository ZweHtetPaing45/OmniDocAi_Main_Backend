import { RequestCreateDocumentDataDTO } from "../../../dto/document/request.create.document.dto";
import { DocumentEntity } from "../../../../domain/entities/document/document.entity";


export interface DocumentRepository{

    create(data : RequestCreateDocumentDataDTO): Promise<DocumentEntity>;
    
}