import { Router } from 'express';
import usersRoute from './user.routes';
import requestRoute from './request.routes';
import authRoute from './auth.routes';
import checkinRoute from './checkin.routes';
import departmentRoute from './department.routes';
import authentication from '../middlewares/authentication';

const router = Router();

router.get('/health-check', (_req, res) => {
    res.send('APIs OK !!');
});

router.use('/user', authentication, usersRoute);

router.use('/request', authentication, requestRoute);

router.use('/checkin', authentication, checkinRoute);

router.use('/auth', authRoute);

router.use('/department', authentication, departmentRoute);

export default router;
