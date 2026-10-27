import { UpdateDocumentPageDTO } from "../../dto/document.page/update-documet-page.dto";
import { DocumentPage } from "../../../domain/entities/document-page/document-page.entity";
import { DocumentPageRepository } from "../../interface/repositories/document.page/document.page.repository";


export class UpdateContentDocumentPageUseCase{

    constructor(
        private documentPageRepository : DocumentPageRepository
    ){}

    async execute(data : UpdateDocumentPageDTO){

        const user_id = data.user_id;
        const page_id = data.page_id;
        const content = data.content;

        await this.documentPageRepository.updateContent(user_id,page_id,content);

    }

}