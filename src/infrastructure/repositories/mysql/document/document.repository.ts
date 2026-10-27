import { DocumentEntity } from "../../../../domain/entities/document/document.entity";
import { DocumentRepository } from "../../../../application/interface/repositories/document/i-document-repository";
import { AppError } from "../../../../application/errors/app-error";
import { Database } from "../../../database/mysql";
import { RequestCreateDocumentDataDTO } from "../../../../application/dto/document/request.create.document.dto";


const pool = Database.getInstance().getPool();


export class MySQLDocumentRepository implements DocumentRepository{


    async create(data : RequestCreateDocumentDataDTO): Promise<DocumentEntity>{

        console.log('data',data);

        const [result] : any = await pool.query('insert into documents (user_id,title,file_name,file_path,total_pages) values (?,?,?,?,?)',[data.user_id,data.title,data.file_name,data.file_path,data.total_pages]);

        if(!result)throw new AppError("Can not create Document",400);

        return new DocumentEntity(result.insertId,data.user_id,data.title,data.file_name,data.file_path,data.total_pages);

    }

}