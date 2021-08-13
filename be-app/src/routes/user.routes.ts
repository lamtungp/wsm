import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validate } from 'express-validation';
import UserRequest from '../request/user.request';
import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
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

router.get(
  '/get-list-staff',
  verifyManagerMiddleware,
  validate(UserRequest.queryRequest),
  userController.getListStaffs,
);

router.get(
  '/get-staff-with-checkin',
  verifyManagerMiddleware,
  validate(UserRequest.queryRequest),
  userController.getStaffsWithCheckin,
);

router.get(
  '/find-user-by-email',
  verifyAllMiddleware,
  validate(UserRequest.queryRequest),
  userController.findUserByEmail,
);

router.post('/create-user', verifyAdminMiddleware, validate(UserRequest.createUser), wrap(userController.addUser));

router.put('/update-user', verifyAllMiddleware, validate(UserRequest.updateUser), userController.updateForUser);

router.delete('/delete-user', verifyAdminMiddleware, validate(UserRequest.queryRequest), userController.deleteOneUser);

export default router;
