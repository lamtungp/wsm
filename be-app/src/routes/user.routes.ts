import { Router } from 'express';
import { validate } from 'express-validation';

import UserController from '../controllers/user.controller';
import UserRequest from '../request/user.request';
import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyManagerUserMiddleware from '../middlewares/verify.user.manager.middleware';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
import verifyAllMiddleware from '../middlewares/verify.all.middleware';
import wrap from '../helpers/wrap';

const router = Router();

const userController = new UserController();

router.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('Go to user APIs !!');
});

router.get('/get-all-user', verifyAdminMiddleware, userController.getAllUsers);

router.get(
  '/get-list-user/:departmentId',
  verifyAdminMiddleware,
  validate(UserRequest.paramRequest),
  userController.getListUsers,
);

router.get('/get-list-staff', verifyManagerMiddleware, userController.getListStaffs);

router.get('/get-staff-with-checkin', verifyManagerMiddleware, userController.getStaffsWithCheckin);

router.get(
  '/find-user-by-email',
  verifyAllMiddleware,
  validate(UserRequest.queryRequest),
  userController.findUserByEmail,
);

router.post('/create-user', verifyAdminMiddleware, validate(UserRequest.createUser), wrap(userController.addUser));

router.put(
  '/update-user-role-admin',
  verifyAdminMiddleware,
  validate(UserRequest.updateUserRoleAdmin),
  userController.updateUserRoleAdmin,
);

router.put(
  '/update-user-role-user',
  verifyManagerUserMiddleware,
  validate(UserRequest.updateUserRoleUser),
  userController.updateUserRoleUser,
);

router.put(
  '/change-password',
  verifyAllMiddleware,
  validate(UserRequest.changePassword),
  userController.changePassword,
);

router.delete('/delete-user', verifyAdminMiddleware, validate(UserRequest.queryRequest), userController.deleteOneUser);

router.post('/upload', userController.uploadImage);

export default router;
