import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { validate } from 'express-validation';
import wrap from '../helpers/wrap';
import userModel from '../models/user.model';
import AuthRequest from '../request/auth.request';

const router = Router();

const authController = new AuthController(userModel);

router.get('/', (_req, res) => {
    res.send('Go to auth APIs !!');
    res.json({ message: 'Go to auth APIs !!' });
});

router.post('/user-login', validate(AuthRequest.customerLogin), wrap(authController.userLogin));

export default router;
