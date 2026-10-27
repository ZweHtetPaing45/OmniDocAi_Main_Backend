import { CreateDocumentUseCase } from "../../application/usecase/document/create.document.usecase";
import { MySQLDocumentRepository } from "../../infrastructure/repositories/mysql/document/document.repository";
import { DocumentController } from "../../interface/http/v1/controller/document/document.controller";
import { MySQLDocumentPageRepository } from "../../infrastructure/repositories/mysql/document-page/document-page.repository";

const documentRepo = new MySQLDocumentRepository();
const documentPageRepo = new MySQLDocumentPageRepository();

const createDocumentUC = new CreateDocumentUseCase(documentRepo,documentPageRepo);


export const documentContainer = new DocumentController(createDocumentUC);