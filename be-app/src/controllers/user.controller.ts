import { Request, Response } from 'express';
import userModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';

export default class UserController {
    private user: UserRepository;

    constructor() {
        this.user = UserRepository.getInstance();
    }

    public getAllUsers = async (_req: Request, res: Response) => {
        try {
            const users = await this.user.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findUserByEmail = async (req: Request, res: Response) => {
        try {
            const user = await this.user.getUserByEmail(req.params.email);
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public addUser = async (req: Request, res: Response) => {
        try {
            const user = await this.user.createUser(req.body);
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public updateForUser = async (req: Request, res: Response) => {
        try {
            const user = await this.user.updateUser(req.body, Number(req.params.id));
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
