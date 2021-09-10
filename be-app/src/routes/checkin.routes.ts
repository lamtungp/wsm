import { Router } from 'express';
import { validate } from 'express-validation';
import CheckinRequest from '../request/checkin.request';
import CheckinController from '../controllers/checkin.controller';
import verifyUserManagerMiddleware from '../middlewares/verify.user.manager.middleware';

const router = Router();

const checkinController = new CheckinController();

router.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('Go to checkin APIs !!');
});

router.get(
  '/get-list-checkin/:userId',
  verifyUserManagerMiddleware,
  validate(CheckinRequest.paramsRequest),
  checkinController.getListCheckin,
);

router.get(
  '/find-checkin/:userId',
  verifyUserManagerMiddleware,
  validate(CheckinRequest.paramsRequest),
  validate(CheckinRequest.queryRequest),
  checkinController.findCheckin,
);

router.post('/create-checkin', verifyUserManagerMiddleware, checkinController.createCheckins);

export default router;
