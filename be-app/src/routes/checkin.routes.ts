import { Router } from 'express';
import CheckinController from '../controllers/checkin.controller';
import wrap from '../helpers/wrap';
// import requestModel from '../models/request.model';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
// import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyUserMiddleware from '../middlewares/verify.user.middleware';

const router = Router();

const checkinController = new CheckinController();

/* GET users. */
router.get('/get-all-checkin', checkinController.getAllCheckin);
router.get('/get-list-checkin/:userId', checkinController.getListCheckin);
router.get('/find-checkin-by-idAccount/:idAccount', checkinController.findCheckinByAccountId);
router.post('/create-checkin/:idAccount', checkinController.addCheckin);
router.post('/update-checkin', checkinController.updateCheckins);

export default router;
