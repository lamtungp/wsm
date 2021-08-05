import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyAdminManagerMiddleware from '../middlewares/verify.admin.manager.middleware';
import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
import verifyAllMiddleware from '../middlewares/verify.all.middleware';

const router = Router();

const userController = new UserController();

router.get('/', (_req, res) => {
    res.send('Go to user APIs !!');
    res.json({ message: 'Go to user APIs !!' });
});

router.get('/get-all-user', verifyAdminMiddleware, userController.getAllUsers);

router.get('/get-list-user/:departmentId', verifyAdminManagerMiddleware, userController.getListUsers);

router.get('/get-list-staff', verifyManagerMiddleware, userController.getListStaffs);

router.get('/get-staff-with-checkin', verifyAdminManagerMiddleware, userController.getStaffsWithCheckin);

router.get('/find-user-by-email', verifyAllMiddleware, userController.findUserByEmail);

router.get('/confirm/:confirmationCode', verifyAllMiddleware, userController.verifyAccount);

router.post('/create-user', verifyAdminMiddleware, userController.addUser);

router.post('/update-user', verifyAllMiddleware, userController.updateForUser);

router.delete('/delete-user', verifyAdminMiddleware, userController.deleteOneUser);

export default router;
