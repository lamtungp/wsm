import { Router } from 'express';
import DepartmentController from '../controllers/department.controller';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';

const router = Router();

const departmentController = new DepartmentController();

router.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('Go to department APIs !!');
});

router.get('/get-all-department', verifyAdminMiddleware, departmentController.getAllDepartment);

router.get('/find-department-by-id/:id', verifyAdminMiddleware, departmentController.findDepartmentById);

router.post('/create-department', verifyAdminMiddleware, departmentController.addDepartment);

router.put('/update-department/:id', verifyAdminMiddleware, departmentController.updateForDepartment);

router.delete('/delete-department/:id', verifyAdminMiddleware, departmentController.deleteOneDepartment);

export default router;
