import { Router } from 'express';
import DepartmentController from '../controllers/department.controller';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
// import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';
import verifyUserMiddleware from '../middlewares/verify.user.middleware';

const router = Router();

const departmentController = new DepartmentController();

/* GET users. */
router.get('/get-all-department', departmentController.getAllDepartment);

// router.get('/find-department-by-id/:id', departmentController.findUserById);

router.post('/create-department', verifyAdminMiddleware, departmentController.addDepartment);

// router.post('/update-usedepartmentr/:id', verifyUserMiddleware, departmentController.updateForUser);

export default router;
