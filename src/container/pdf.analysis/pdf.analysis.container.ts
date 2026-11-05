import { PdfAnalyzerController } from "../../interface/http/v1/controller/pdf.analyzer/pdf.analyzer.controller";
import { PdfAnalyzerUseCase } from "../../application/usecase/pdf.analyzer/pdf.analyzer.usecase";
import { MySQLPdfAnalysisRepository } from "../../infrastructure/repositories/mysql/pdf.analysis/pdf.analysis.repository";

const mySQLPdfAnalysisRepository = new MySQLPdfAnalysisRepository();

const pdfAnalyzerUseCase = new PdfAnalyzerUseCase(mySQLPdfAnalysisRepository);


export const pdfAnalyzerControllerContainer = new PdfAnalyzerController(pdfAnalyzerUseCase);