import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';

const router = Router();

const userController = new UserController();

router.get('/account/:confirmationCode', userController.verifyAccount);

router.post('/reset-password', verifyAdminMiddleware, userController.resetPassword);

export default router;
