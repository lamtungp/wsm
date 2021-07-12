import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import userModel from '../models/user.model';

const router = Router();

const authController = new AuthController(userModel);

router.get('/', (_req, res) => {
    res.send('Go to auth APIs !!');
    res.json({ message: 'Go to auth APIs !!' });
});
router.post('/user-login', authController.userLogin);

export default router;
