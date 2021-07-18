import { Router } from 'express';
import usersRoute from './user.routes';
import requestRoute from './request.routes';
import authRoute from './auth.routes';
import checkinRoute from './checkin.routes';

const router = Router();

/* GET users listing. */
router.get('/health-check', (_req, res) => {
    res.send('APIs OK !!');
});

router.use('/user', usersRoute);
router.use('/request', requestRoute);
router.use('/checkin', checkinRoute);
router.use('/auth', authRoute);

export default router;
