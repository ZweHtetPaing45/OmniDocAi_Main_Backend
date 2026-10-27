import {Router} from 'express';
import authUserRoute from '../auth/user.auth.route';
import pdfRouter from '../document/document.route';
import documentPageRouter from '../document-page/document-page.route';

const router = Router();

router.use('/auth',authUserRoute);
router.use('/pdf',pdfRouter);
router.use('/document_page',documentPageRouter);

export default router;