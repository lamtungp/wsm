import { Router } from 'express';
import RequestController from '../controllers/request.controller';
import { validate } from 'express-validation';
import validateRequest from '../request/request.request';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
import verifyAdminManagerMiddleware from '../middlewares/verify.admin.manager.middleware';
import verifyUserManagerMiddleware from '../middlewares/verify.user.manager.middleware';
import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyAllMiddleware from '../middlewares/verify.all.middleware';

const router = Router();

const requestController = new RequestController();

router.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('Go to request APIs !!');
});

router.get('/get-all-request', verifyAdminMiddleware, requestController.getAllRequest);

router.get('/get-list-request', verifyUserManagerMiddleware, requestController.getListRequest);

router.get('/get-list-request-of-staff', verifyManagerMiddleware, requestController.getListRequestOfStaff);

router.get(
  '/find-request-by-id/:requestId',
  verifyUserManagerMiddleware,
  validate(validateRequest.paramsRequest),
  requestController.findRequestById,
);

router.post(
  '/create-request',
  verifyAllMiddleware,
  validate(validateRequest.createRequest),
  requestController.addRequest,
);

router.put(
  '/update-form-request/:requestId',
  verifyAllMiddleware,
  validate(validateRequest.updateFormRequest),
  requestController.updateFormRequest,
);

router.put(
  '/update-handler-request/:requestId',
  verifyAdminManagerMiddleware,
  validate(validateRequest.updateHandlerRequest),
  requestController.updateHandlerRequest,
);

router.get(
  '/find-request-by-state',
  verifyAdminMiddleware,
  validate(validateRequest.queryRequest),
  requestController.getListRequestByState,
);

router.delete(
  '/delete-request/:requestId',
  verifyAllMiddleware,
  validate(validateRequest.paramsRequest),
  requestController.deleteOneRequest,
);

export default router;
