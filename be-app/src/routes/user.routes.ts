import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
// import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyUserMiddleware from '../middlewares/verify.user.middleware';

const router = Router();

const userController = new UserController();

/* GET users. */
router.get('/get-all-user', verifyAdminMiddleware, userController.getAllUsers);

router.get('/get-list-user/:departmentId', userController.getListUsers);

router.get('/get-list-staff/:userId', userController.getListStaffs);

router.get('/get-staff-with-checkin/:userId', userController.getStaffsWithCheckin);

router.get('/find-user-by-id/:id', userController.findUserById);

router.get('/confirm/:confirmationCode', userController.verifyAccount);

router.post('/create-user', verifyAdminMiddleware, userController.addUser);

router.post('/update-user/:id', userController.updateForUser);

router.delete('/delete-user/:id', userController.deleteOneUser);

export default router;
