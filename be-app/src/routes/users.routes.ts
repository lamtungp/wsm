import { Router } from 'express';
import UserController from '../controllers/user.controller';
import userModel from '../models/user.model';

const router = Router();

const userController = new UserController(userModel);

/* GET users. */
router.get('/get-user', userController.getListUsers);
router.get('/find-user-by-email/:email', userController.findUserByEmail);

export default router;
