import {Router} from 'express';
import authUserRoute from '../auth/user.auth.route';

const router = Router();

router.use('/auth',authUserRoute);


export default router;