import { Router } from 'express';
import CheckinController from '../controllers/checkin.controller';
import verifyAdminManagerMiddleware from '../middlewares/verify.admin.manager.middleware';
import verifyUserManagerMiddleware from '../middlewares/verify.user.manager.middleware';

const router = Router();

const checkinController = new CheckinController();

router.get('/', (_req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('Go to checkin APIs !!');
});

router.get('/get-list-checkin/:userId', verifyUserManagerMiddleware, checkinController.getListCheckin);

router.get(
    '/get-list-checkin-with-date/:userId',
    verifyAdminManagerMiddleware,
    checkinController.getListCheckinWithDate,
);

router.get('/find-checkin/:userId', verifyUserManagerMiddleware, checkinController.findCheckinByUserIdDate);

router.post('/update-checkin', verifyUserManagerMiddleware, checkinController.updateCheckins);

export default router;
