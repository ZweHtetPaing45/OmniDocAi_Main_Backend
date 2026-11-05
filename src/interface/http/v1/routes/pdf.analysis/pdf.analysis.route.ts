import {Router} from "express";
import { upload } from "../../middlewares/upload.middleware";
import { pdfAnalyzerControllerContainer } from "../../../../../container/pdf.analysis/pdf.analysis.container";
import { authMiddlewareContainer } from "../../../../../container/auth/user.auth.container";

const router = Router();


router.post('/pdf_analysis',authMiddlewareContainer.handle.bind(authMiddlewareContainer),upload.single('pdf'),pdfAnalyzerControllerContainer.uploadPdf.bind(pdfAnalyzerControllerContainer));


export default router;