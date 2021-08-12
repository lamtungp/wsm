import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';

const router = Router();

const userController = new UserController();

router.put('/account/:confirmationCode', userController.verifyAccount);

router.put('/reset-password', verifyAdminMiddleware, userController.resetPassword);

export default router;
