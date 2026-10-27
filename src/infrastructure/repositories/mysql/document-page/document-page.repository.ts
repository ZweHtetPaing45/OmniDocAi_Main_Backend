import { Database } from "../../../database/mysql";
import { DocumentPageRepository } from "../../../../application/interface/repositories/document.page/document.page.repository";
import { RequestCreateDocumentPageDTO } from "../../../../application/dto/document.page/create.document.page.dto";
import { AppError } from "../../../../application/errors/app-error";
import { DocumentPage } from "../../../../domain/entities/document-page/document-page.entity";
import { RowDataPacket } from "mysql2";
import path from 'path';
//import { updateAudioPathDTO } from "../../../../application/dto/voice/update-voice-path.dto";


const pool = Database.getInstance().getPool();


export class MySQLDocumentPageRepository implements DocumentPageRepository{

    async createMany(document_id: number, pages: RequestCreateDocumentPageDTO[]): Promise<void> {

        console.log("Repository Document id",document_id);
        console.log("pages",pages)

         if(pages.length === 0 ){
            return;
        }

        const values = pages.map((page)=> [document_id,page.page_number,page.content ?? null,page.pdf_image_url ?? null,page.pdf_delete_id ?? null]);

        const sql = `insert into document_pages (document_id,page_number,content,pdf_image_url,pdf_delete_id) values ?`;

        const result = await pool.query(sql,[values]);

        if(!result)throw new AppError('Can not create Document Page',400);

    }


    async getAllPage(user_id : number): Promise<DocumentPage[]> {

        const [rows] : any = await pool.query(`
            SELECT
            d.id AS document_id,
            d.user_id,
            d.title,
            d.file_name,
            d.total_pages,
            dp.id AS page_id,
            dp.page_number,
            dp.content,
            dp.pdf_image_url,
            dp.pdf_delete_id,
            dp.audio_path
        FROM documents d
        INNER JOIN document_pages dp
            ON dp.document_id = d.id
        WHERE d.user_id = ?
        ORDER BY d.id, dp.page_number;
            `,[user_id]);
        

        return rows.map((row:any)=> new DocumentPage(row.page_id,row.document_id,row.file_name,row.page_number,row.content,row.pdf_image_url,row.pdf_delete_id,row.audio_path));
        
    }

    async getPageByDocumentId(user_id: number,documentId: number): Promise<DocumentPage[]> {

        const [rows] : any = await pool.query(`
                SELECT
            d.id AS document_id,
            d.user_id,
            d.title,
            d.file_name,
            d.total_pages,
            dp.id AS page_id,
            dp.page_number,
            dp.content,
            dp.pdf_image_url,
            dp.pdf_delete_id,
            dp.audio_path

        FROM documents d
        INNER JOIN document_pages dp
            ON dp.document_id = d.id
        WHERE d.user_id = ? and dp.document_id = ?
        ORDER BY d.id, dp.page_number;
            `,[user_id,documentId])

    
    return rows.map((row:any)=> new DocumentPage(row.page_id,row.document_id,row.file_name,row.page_number,row.content,row.pdf_image_url,row.pdf_delete_id,row.audio_path));

    }

    async updateContent(user_id : number,pageId: number, content: string): Promise<void> {
        
        await pool.query(`
            update document_pages dp inner join documents d on d.id = dp.document_id 
            set dp.content = ? where dp.id = ? and d.user_id = ? 
            `,[content,pageId,user_id]);

    }

    async getPagesForVoice(userId: number, documentId: number, pageNumbers: number[]): Promise<{ folderName: string; pages: { fileName: string; content: string; }[] }> {
        
      
        if(!pageNumbers.length){
            return {folderName: "",pages: []};
        }

        const placeholders = pageNumbers.map(()=> "?").join(", ");

        const sql = `
            select 
                d.id as document_id,
                d.user_id,
                d.title,
                d.file_name,
                d.total_pages,
                dp.id as page_id,
                dp.page_number,
                dp.content,
                dp.pdf_image_url,
                dp.pdf_delete_id,
                dp.audio_path
            from documents d inner join document_pages dp
            on dp.document_id = d.id
            where d.user_id = ? and dp.document_id = ? and dp.page_number in (${placeholders})
            order by dp.page_number
        `;

        const params = [userId,documentId,...pageNumbers];

    
        const [rows] = await pool.query<RowDataPacket[]>(sql,params);

       
        if(rows.length === 0){
            throw new AppError("Document pages not found",404);
        }

        const folderName = path.basename(rows[0].file_name,path.extname(rows[0].file_name));

  
        return {
            folderName,
            pages: rows.map(row => ({fileName: `page-${row.page_number}`,content: row.content ?? ""}))
        };
    }


    // async updateAudioPath(data: updateAudioPathDTO): Promise<void> {
        
    //     const sql = `
    //             update document_pages dp inner join documents d 
    //             on d.id = dp.document_id set dp.audio_path = ?
    //             where d.user_id = ? and dp.document_id = ? 
    //             and dp.page_number = ?
    //     `;

    //     const params = [
    //         data.audioPath,
    //         data.userId,
    //         data.documentId,
    //         data.pageNumber
    //     ]

    //     console.log("params",params);

    //     await pool.query(sql,params);

    // }
    
}