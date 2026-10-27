import { Router } from "express";
import { documentPageContainer } from "../../../../../container/document-page/document-page.container";
import { authMiddlewareContainer } from "../../../../../container/auth/user.auth.container";

const router = Router();

//Get Method
router.get('/',authMiddlewareContainer.handle.bind(authMiddlewareContainer),documentPageContainer.getAllList.bind(documentPageContainer));
router.get("/:documentId",authMiddlewareContainer.handle.bind(authMiddlewareContainer),documentPageContainer.getDocumentPage.bind(documentPageContainer));

//Patch Method
router.patch('/:page_id',authMiddlewareContainer.handle.bind(authMiddlewareContainer),documentPageContainer.updateContent.bind(documentPageContainer));

export default router;