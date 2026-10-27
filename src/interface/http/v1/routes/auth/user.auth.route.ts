import { Router } from 'express';
import { authUserControllerContainer } from "../../../../../container/auth/user.auth.container";

const router = Router();

router.post('/register',authUserControllerContainer.register.bind(authUserControllerContainer));
router.post('/login',authUserControllerContainer.login.bind(authUserControllerContainer));


export default router;