import { Router } from 'express';
import RequestController from '../controllers/request.controller';
import verifyAdminManagerMiddleware from '../middlewares/verify.admin.manager.middleware';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
import verifyUserManagerMiddleware from '../middlewares/verify.user.manager.middleware';
import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyAllMiddleware from '../middlewares/verify.all.middleware';

const router = Router();

const requestController = new RequestController();

router.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('Go to request APIs !!');
});

router.get('/get-all-request', verifyAdminManagerMiddleware, requestController.getAllRequest);

router.get('/get-list-request/:userId', verifyUserManagerMiddleware, requestController.getListRequest);

router.get('/get-list-request-of-staff', verifyManagerMiddleware, requestController.getListRequestOfStaff);

router.get('/find-request-by-id/:id', verifyAllMiddleware, requestController.findRequestById);

router.post('/create-request', verifyAllMiddleware, requestController.addRequest);

router.put('/update-request/:id', verifyAllMiddleware, requestController.updateForRequest);

router.get('/find-request-by-state', verifyAllMiddleware, requestController.getListRequestByState);

router.delete('/delete-request/:id', verifyAllMiddleware, requestController.deleteOneRequest);

export default router;
