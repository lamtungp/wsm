import { Request, Response, NextFunction } from 'express';
import InternalServerError from '../commons/http-errors/InternalServerError';
import { generateToken } from '../lib/passports';
import UserRepository from '../repositories/user.repository';
import CheckinRepository from '../repositories/checkin.repository';
import RequestRepository from '../repositories/request.repository';
import sendEmail from '../../config/nodemailer';
import Bcrypt from '../lib/bcrypt';
import NotFoundError from '../commons/http-errors/NotFoundError';

export default class UserController {
    private user: UserRepository;
    private checkin: CheckinRepository;
    private request: RequestRepository;

    constructor() {
        this.user = UserRepository.getInstance();
        this.checkin = CheckinRepository.getInstance();
        this.request = RequestRepository.getInstance();
    }

    public getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
        const users = await this.user.getUsers();
        if (!!users) {
            return res.status(200).json(users);
        }
        next(new InternalServerError());
    };

    public getListUsers = async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.user.getListUser(Number(req.params.departmentId));
        if (!!users) {
            return res.status(200).json(users);
        }
        next(new InternalServerError());
    };

    public getListStaffs = async (req: Request, res: Response, next: NextFunction) => {
        const manager = await this.user.getUserByEmail(String(req.query.email));
        if (!!manager) {
            const users = await this.user.getListStaff(manager.departmentId, String(req.query.role));
            if (!!users) {
                return res.status(200).json(users);
            }
            next(new NotFoundError());
        }
        next(new InternalServerError());
    };

    public getStaffsWithCheckin = async (req: Request, res: Response, next: NextFunction) => {
        const manager = await this.user.getUserByEmail(String(req.query.email));
        if (!!manager) {
            const users = await this.user.getStaffWithCheckin(manager.departmentId, String(req.query.date));
            if (!!users) {
                return res.status(200).json(users);
            }
            next(new InternalServerError());
        }
        next(new InternalServerError('Invalid useId'));
    };

    public findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.user.getUserByEmail(String(req.query.email));
        if (!!user) {
            return res.status(200).json(user);
        }
        next(new InternalServerError('Invalid ID'));
    };

    public addUser = async (req: Request, res: Response, next: NextFunction) => {
        const hashPassword = await Bcrypt.generateHashPassword(req.body.password);
        const token = generateToken(req.body);
        const user = await this.user.createUser({
            ...req.body,
            password: hashPassword,
            confirmationCode: token,
        });
        if (!!user) {
            const send = sendEmail(user.name, user.email, user.confirmationCode);
            if (!!send) {
                return res.status(200).send({
                    message: 'User was registered successfully! Please check your email',
                    confirmationCode: token,
                });
            }
            next(new InternalServerError('ko gui duoc email'));
        }
        next(new InternalServerError());
    };

    public verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.user.findUserByConfirmCode(String(req.params.confirmationCode));
        if (!!user) {
            const update = await this.user.updateUser({ status: 'actived' }, user.email);
            return res.status(200).json(update);
        }
        next(new InternalServerError());
    };

    public updateForUser = async (req: Request, res: Response, next: NextFunction) => {
        if (!!req.body.password) {
            const hashPassword = await Bcrypt.generateHashPassword(req.body.password);
            const user = await this.user.updateUser({ ...req.body, password: hashPassword }, String(req.query.email));
            if (!!user) {
                return res.status(200).json(user);
            }
            next(new InternalServerError());
        }
        const user = await this.user.updateUser(req.body, String(req.query.email));
        if (!!user) {
            return res.status(200).json(user);
        }
        next(new InternalServerError());
    };

    public deleteOneUser = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.user.getUserByEmail(String(req.query.email));
        if (!!user) {
            await this.checkin.deleteCheckinByUserId(user.id);
            await this.request.deleteRequestByUserId(user.id);
            const deleteUser = await this.user.deleteUser(String(req.query.email));
            if (!!deleteUser) {
                return res.status(200).json(deleteUser);
            }
            next(new InternalServerError());
        }
        next(new InternalServerError());
    };
}
