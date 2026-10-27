import { Router } from "express";
import { documentContainer } from "../../../../../container/document/document.container";
import { upload } from "../../middlewares/upload.middleware";
import { authMiddlewareContainer } from "../../../../../container/auth/user.auth.container";

const router = Router();

//Post Method
router.post('/upload',authMiddlewareContainer.handle.bind(authMiddlewareContainer),upload.single('pdf'),documentContainer.create.bind(documentContainer));


export default router;