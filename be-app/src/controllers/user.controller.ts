import { Request, Response } from 'express';
import UserRepository from '../repositories/user.repository';

export default class UserController extends UserRepository {
    public getListUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.getUser();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
