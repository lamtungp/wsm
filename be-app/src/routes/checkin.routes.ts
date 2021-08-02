import { Router } from 'express';
import CheckinController from '../controllers/checkin.controller';
// import wrap from '../helpers/wrap';
// import verifyAdminManagerMiddleware from '../middlewares/verify.admin.middleware';

const router = Router();

const checkinController = new CheckinController();

router.get('/', (_req, res) => {
    res.send('Go to checkin APIs !!');
    res.json({ message: 'Go to checkin APIs !!' });
});

router.get('/get-list-checkin/:userId', checkinController.getListCheckin);

router.get('/get-list-checkin-with-date/:userId', checkinController.getListCheckinWithDate);

router.get('/find-checkin/:userId', checkinController.findCheckinByUserIdDate);

router.post('/update-checkin', checkinController.updateCheckins);

export default router;
