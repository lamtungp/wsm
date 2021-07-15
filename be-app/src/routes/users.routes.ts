import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const userController = new UserController();

/* GET users. */
router.get('/get-user', userController.getListUsers);
router.get('/find-user-by-email/:email', userController.findUserByEmail);
router.post('/create-user', userController.addUser);

export default router;
