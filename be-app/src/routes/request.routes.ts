import { Router } from 'express';
import RequestController from '../controllers/request.controller';
// import requestModel from '../models/request.model';

const router = Router();

const requestController = new RequestController();

/* GET users. */
router.get('/get-all-request', requestController.getAllRequest);
router.get('/get-list-request/:id', requestController.getListRequest);
router.get('/find-request-by-id/:id', requestController.findRequestById);
router.post('/create-request', requestController.addRequest);

export default router;
