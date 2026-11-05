import { IPdfAnalysisRepository } from "../../../../application/interface/repositories/pdf.analysis/i.pdf.analysis";
import {Database} from "../../../database/mysql";
import { AppError } from "../../../../application/errors/app-error";
import { createLogger } from "../../../../infrastructure/logger/create-logger";


const pool = Database.getInstance().getPool();

const logger = createLogger();


export class MySQLPdfAnalysisRepository implements IPdfAnalysisRepository {

    async updateContent(user_id: number, pageId: number, content: string): Promise<void> {

        console.log("User id",user_id);
        console.log("page id",pageId);
        console.log("content",content);

        const [result]: any = await pool.query(
            `UPDATE document_pages dp
            INNER JOIN documents d ON d.id = dp.document_id
            SET dp.content = ?
            WHERE dp.id = ? AND d.user_id = ?`,
            [content, pageId, user_id]
        );

    if (result.affectedRows === 0) {
        logger.warn(`Page ${pageId} not found for user ${user_id}`);
        throw new AppError("Page not found", 404);
    }
    }


}
