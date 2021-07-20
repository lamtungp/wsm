import { Request, Response, NextFunction } from 'express';
import InternalServerError from '../commons/http-errors/InternalServerError';
import userModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';

export default class UserController {
    private user: UserRepository;

    constructor() {
        this.user = UserRepository.getInstance();
    }

    public getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
        const users = await this.user.getUsers();
        if (!!users) {
            return res.status(200).json(users);
        } else {
            next(new InternalServerError());
        }
    };

    public getListUsers = async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.user.getListUser(Number(req.params.departmentId));
        if (!!users) {
            return res.status(200).json(users);
        } else {
            next(new InternalServerError());
        }
    };

    public getListStaff = async (req: Request, res: Response, next: NextFunction) => {
        const manager = await this.user.getUserById(Number(req.params.userId));
        if (!!manager) {
            const users = await this.user.getListStaff(manager.dataValues.departmentId, String(req.query.role));
            if (!!users) {
                return res.status(200).json(users);
            } else {
                next(new InternalServerError());
            }
        } else {
            next(new InternalServerError());
        }
    };

    public findUserById = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.user.getUserById(Number(req.params.id));
        if (!!user) {
            return res.status(200).json(user);
        } else {
            next(new InternalServerError());
        }
    };

    public addUser = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.user.createUser(req.body);
        if (!!user) {
            return res.status(200).json(user);
        } else {
            next(new InternalServerError());
        }
    };

    public updateForUser = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.user.updateUser(req.body, Number(req.params.id));
        if (!!user) {
            return res.status(200).json(user);
        } else {
            next(new InternalServerError());
        }
    };
}
