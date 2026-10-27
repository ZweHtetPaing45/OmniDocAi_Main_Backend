import { MySQLDocumentPageRepository } from "../../infrastructure/repositories/mysql/document-page/document-page.repository";
import { GetAllDocumentPageUseCase } from "../../application/usecase/document-page/get-all-document-page.usecase";
import { DocumentPageController } from "../../interface/http/v1/controller/document-page/document-page.controller";
import { GetDocumentPageUseCase } from "../../application/usecase/document-page/get-document-page.usecase";
import { UpdateContentDocumentPageUseCase } from "../../application/usecase/document-page/update-content-document-page.usecase";


const documentPageRepo = new MySQLDocumentPageRepository();

const getAllDocumentPageUC = new GetAllDocumentPageUseCase(documentPageRepo);
const getDocumentPageUC = new GetDocumentPageUseCase(documentPageRepo);
const updateContentDocumentPageUC = new UpdateContentDocumentPageUseCase(documentPageRepo);

export const documentPageContainer = new DocumentPageController(getAllDocumentPageUC,getDocumentPageUC,updateContentDocumentPageUC);
