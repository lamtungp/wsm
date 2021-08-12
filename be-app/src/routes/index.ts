import { Router } from 'express';
import usersRoute from './user.routes';
import requestRoute from './request.routes';
import authRoute from './auth.routes';
import confirmRoute from './confirm.routes';
import checkinRoute from './checkin.routes';
import departmentRoute from './department.routes';
import authentication from '../middlewares/authentication';

const router = Router();

router.get('/health-check', (_req, res) => {
  // console.log(res);
  res.setHeader('Content-Type', 'text/html');
  return res.json({ message: 'APIs OK!!' });
});

router.use('/user', authentication, usersRoute);

router.use('/request', authentication, requestRoute);

router.use('/checkin', authentication, checkinRoute);

router.use('/auth', authRoute);

router.use('/confirm', confirmRoute);

router.use('/department', authentication, departmentRoute);

export default router;
