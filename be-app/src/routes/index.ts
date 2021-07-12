import { Router } from 'express';
import usersRoute from './users';
import authRoute from './auth.routes';

const router = Router();

/* GET users listing. */
router.get('/health-check', (_req, res) => {
    res.send('APIs OK !!');
});

router.use('/users', usersRoute);
router.use('/auth', authRoute);

export default router;
