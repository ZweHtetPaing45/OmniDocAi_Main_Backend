import { RequestCreateDocumentPageDTO } from "../../../dto/document.page/create.document.page.dto";
import { DocumentPage } from "../../../../domain/entities/document-page/document-page.entity";
// import { updateAudioPathDTO } from "../../../dto/voice/update-voice-path.dto";


export interface DocumentPageRepository{

    createMany(document_id : number,pages : RequestCreateDocumentPageDTO[]): Promise<void>;
    getAllPage(user_id : number): Promise<DocumentPage[]>;
    getPageByDocumentId(user_id : number,documentId: number): Promise<DocumentPage[]>
    updateContent(user_id : number,pageId: number,content: string): Promise<void>;
    getPagesForVoice(userId: number,documentId: number,pageNumbers: number[]): Promise<{folderName: string;pages: {fileName: string;content: string}[]}>;
    //updateAudioPath(data : updateAudioPathDTO): Promise<void>;

}