import { Router } from 'express';
import usersRoute from './users.routes';
import requestsRoute from './request.routes';
import authRoute from './auth.routes';
import checkedRoute from './checked.routes';

const router = Router();

/* GET users listing. */
router.get('/health-check', (_req, res) => {
    res.send('APIs OK !!');
});

router.use('/users', usersRoute);
router.use('/requests', requestsRoute);
router.use('/checkeds', checkedRoute);
router.use('/auth', authRoute);

export default router;
