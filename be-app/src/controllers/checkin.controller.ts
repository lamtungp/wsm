import { Request, Response } from 'express';
import CheckinRepository from '../repositories/checkin.repository';
import HttpError from '../commons/http-errors/InternalServerError';

export default class CheckinController {
    private checkin: CheckinRepository;

    constructor() {
        this.checkin = CheckinRepository.getInstance();
    }

    public getAllCheckin = async (req: Request, res: Response) => {
        const checkins = await this.checkin.getCheckins();
        return res.status(200).json(checkins);
    };

    public getListCheckin = async (req: Request, res: Response, next) => {
        console.log(req.params.userId);
        const checkin = await this.checkin.getListCheckinById(Number(req.params.userId));
        return res.status(200).json(checkin);
    };

    public findCheckinByAccountId = async (req: Request, res: Response) => {
        try {
            const checkin = await this.checkin.getCheckinByIdAccount(Number(req.params.userID), String(req.query.day));
            return res.status(200).json(checkin);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public addCheckin = async (req: Request, res: Response) => {
        try {
            const checkin = await this.checkin.createCheckin(req.body);
            return res.status(200).json(checkin);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public updateCheckins = async (req: Request, res: Response) => {
        try {
            const userCheckin = await this.checkin.getCheckinByIdAccount(
                Number(req.query.userID),
                String(req.query.day),
            );
            // console.log(userCheckin);
            if (userCheckin !== null) {
                const checkin = await this.checkin.updateCheckin(
                    String(req.query.day),
                    Number(req.query.userID),
                    req.body,
                );
                return res.status(200).json(checkin);
            } else {
                const checkin = await this.checkin.createCheckin(req.body);
                return res.status(200).json(checkin);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
