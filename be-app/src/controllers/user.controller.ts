import { Request, Response } from 'express';
import userModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';

export default class UserController {
    private userController: UserRepository;

    constructor() {
        this.userController = UserRepository.getInstance();
    }

    public getListUsers = async (_req: Request, res: Response) => {
        try {
            const users = await this.userController.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findUserByEmail = async (req: Request, res: Response) => {
        try {
            const user = await this.userController.getUserByEmail(req.params.email);
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public addUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userController.createUser(req.body);
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
