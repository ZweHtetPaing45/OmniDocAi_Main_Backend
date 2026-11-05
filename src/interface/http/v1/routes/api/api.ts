import {Router} from 'express';
import authUserRoute from '../auth/user.auth.route';
import pdfRouter from '../document/document.route';
import documentPageRouter from '../document-page/document-page.route';
import pdfAnalysisRouter from '../pdf.analysis/pdf.analysis.route';

const router = Router();

router.use('/auth',authUserRoute);
router.use('/pdf',pdfRouter);
router.use('/document_page',documentPageRouter);
router.use('/process',pdfAnalysisRouter);

export default router;