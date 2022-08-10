import { Router } from 'express';
import { validate } from 'express-validation';
import DepartmentRequest from '../request/department.request';

import DepartmentController from '../controllers/department.controller';
import verifyAdminMiddleware from '../middlewares/verify.admin.middleware';

const router = Router();

const departmentController = new DepartmentController();

router.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('Go to department APIs !!');
});

router.get('/get-all-department', verifyAdminMiddleware, departmentController.getAllDepartment);

router.get('/find-department-by-id/:departmentId', verifyAdminMiddleware, departmentController.findDepartmentById);

router.post(
  '/create-department',
  verifyAdminMiddleware,
  validate(DepartmentRequest.createDepartment),
  departmentController.addDepartment,
);

router.put(
  '/update-department/:departmentId',
  verifyAdminMiddleware,
  validate(DepartmentRequest.updateDepartment),
  departmentController.updateForDepartment,
);

router.delete(
  '/delete-department/:departmentId',
  verifyAdminMiddleware,
  validate(DepartmentRequest.paramRequest),
  departmentController.deleteOneDepartment,
);

export default router;
