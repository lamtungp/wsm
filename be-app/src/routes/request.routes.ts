import { Router } from 'express';
import RequestController from '../controllers/request.controller';
// import requestModel from '../models/request.model';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
// import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyUserMiddleware from '../middlewares/verify.user.middleware';

const router = Router();

const requestController = new RequestController();

/* GET all request. */
router.get('/get-all-request', verifyAdminMiddleware, requestController.getAllRequest);
/* GET list request. */
router.get('/get-list-request/:userId', requestController.getListRequest);
/* GET request by id. */
router.get('/find-request-by-id/:id', requestController.findRequestById);
/* CREATE request. */
router.post('/create-request', requestController.addRequest);

export default router;
