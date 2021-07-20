import { Router } from 'express';
import DepartmentController from '../controllers/department.controller';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';
// import verifyManagerMiddleware from '../middlewares/verify.manager.middleware';

const router = Router();

const departmentController = new DepartmentController();

/* GET users. */
router.get('/get-all-department', verifyAdminMiddleware, departmentController.getAllDepartment);

router.get('/find-department-by-id/:id', verifyAdminMiddleware, departmentController.findDepartmentById);

router.post('/create-department', verifyAdminMiddleware, departmentController.addDepartment);

router.post('/update-department/:id', verifyAdminMiddleware, departmentController.updateForDepartment);

export default router;
