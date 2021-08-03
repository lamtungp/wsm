import { Router } from 'express';
import usersRoute from './user.routes';
import requestRoute from './request.routes';
import authRoute from './auth.routes';
import checkinRoute from './checkin.routes';
import departmentRoute from './department.routes';

const router = Router();

router.get('/health-check', (_req, res) => {
    res.send('APIs OK !!');
});

router.use('/user', usersRoute);

router.use('/request', requestRoute);

router.use('/checkin', checkinRoute);

router.use('/auth', authRoute);

router.use('/department', departmentRoute);

export default router;
