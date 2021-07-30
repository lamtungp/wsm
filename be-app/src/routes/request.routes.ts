import { Router } from 'express';
import RequestController from '../controllers/request.controller';
// import requestModel from '../models/request.model';
import verifyAdminManagerMiddleware from '../middlewares/verify.admin.manager.middleware';

const router = Router();

const requestController = new RequestController();

router.get('/', (_req, res) => {
    res.send('Go to request APIs !!');
    res.json({ message: 'Go to request APIs !!' });
});

router.get('/get-all-request', verifyAdminManagerMiddleware, requestController.getAllRequest);

router.get('/get-list-request/:userId', requestController.getListRequest);

router.get('/find-request-by-id/:id', requestController.findRequestById);

router.post('/create-request', requestController.addRequest);

router.post('/update-request/:id', requestController.updateForRequest);

router.get('/find-request-by-state', requestController.getListRequestByState);

export default router;
