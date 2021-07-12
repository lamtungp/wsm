import { Router } from 'express';
import UserController from '../controllers/user.controller';
import sequelize from '../lib/sequelize';
import userModel from '../models/user.model';

const router = Router();

// const { QueryTypes } = require('sequelize');
// const select = async (_req, res) => {
//     try {
//         const users = await sequelize.query('SELECT * FROM `users`', { type: QueryTypes.SELECT });
//         return res.status(200).json(users);
//     } catch (err) {
//         return res.status(500).json(err.messages);
//     }
// };

/* GET users listing. */
const userController = new UserController(userModel);
/* GET users listing. */
router.get('/get-user', userController.getListUsers);

export default router;
