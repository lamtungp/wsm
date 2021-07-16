import { Router } from 'express';
import CheckedController from '../controllers/checked.controller';
// import requestModel from '../models/request.model';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
// import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyUserMiddleware from '../middlewares/verify.user.middleware';

const router = Router();

const checkedController = new CheckedController();

/* GET users. */
router.get('/get-all-checked', checkedController.getAllChecked);
router.get('/get-list-checked/:userID', checkedController.getListChecked);
router.get('/find-checked-by-idAccount/:idAccount', checkedController.findCheckedByAccountId);
router.post('/create-checked/:idAccount', checkedController.addChecked);
router.post('/update-checked', checkedController.updateCheckeds);

export default router;
