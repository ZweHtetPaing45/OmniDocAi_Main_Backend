import { DocumentPage } from "../../../domain/entities/document-page/document-page.entity";
import { DocumentPageRepository } from "../../interface/repositories/document.page/document.page.repository";




export class GetAllDocumentPageUseCase{

    constructor(
        private documentPageRepository : DocumentPageRepository
    ){}


    async execute(user_id : number): Promise<DocumentPage>{

        const result : any = await this.documentPageRepository.getAllPage(user_id);

        return result;

    }

}