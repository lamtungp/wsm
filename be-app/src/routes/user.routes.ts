import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
import verifyAdminManagerMiddleware from '../middlewares/verify.admin.manager.middleware';
import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';

const router = Router();

const userController = new UserController();

router.get('/', (_req, res) => {
    res.send('Go to user APIs !!');
    res.json({ message: 'Go to user APIs !!' });
});

router.get('/get-all-user', userController.getAllUsers);

router.get('/get-list-user/:departmentId', verifyAdminManagerMiddleware, userController.getListUsers);

router.get('/get-list-staff/:managerId', verifyManagerMiddleware, userController.getListStaffs);

router.get('/get-staff-with-checkin/:userId', verifyAdminManagerMiddleware, userController.getStaffsWithCheckin);

router.get('/find-user-by-id/:id', userController.findUserById);

router.get('/confirm/:confirmationCode', userController.verifyAccount);

router.post('/create-user', userController.addUser);

router.post('/update-user/:id', userController.updateForUser);

router.delete('/delete-user/:id', userController.deleteOneUser);

export default router;
