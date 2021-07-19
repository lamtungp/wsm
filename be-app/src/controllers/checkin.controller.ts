import { Request, Response } from 'express';
import CheckinRepository from '../repositories/checkin.repository';
import HttpError from '../commons/http-errors/InternalServerError';
import InternalServerError from '../commons/http-errors/InternalServerError';

export default class CheckinController {
    private checkin: CheckinRepository;

    constructor() {
        this.checkin = CheckinRepository.getInstance();
    }

    public getAllCheckin = async (req: Request, res: Response) => {
        const checkins = await this.checkin.getCheckins();
        return res.status(200).json(checkins);
    };

    public getListCheckin = async (req: Request, res: Response) => {
        console.log(req.params.userId);
        const checkin = await this.checkin.getListCheckinById(Number(req.params.userId));
        return res.status(200).json(checkin);
    };

    public findCheckinByUserId = async (req: Request, res: Response) => {
        try {
            // console.log('userId ', req.params.userId);
            // console.log('date ', req.query.date);
            const checkin = await this.checkin.getCheckinByUserId(Number(req.params.userId), String(req.query.date));
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

    public updateCheckins = async (req: Request, res: Response, next) => {
        try {
            const userCheckin = await this.checkin.getCheckinByUserId(Number(req.query.userId), String(req.query.date));
            // console.log(userCheckin);
            if (!!userCheckin) {
                if (!!!userCheckin.dataValues.checkout && !!!userCheckin.dataValues.checkin) {
                    console.log('here');
                    const checkin = await this.checkin.updateCheckin(
                        Number(req.query.userId),
                        String(req.query.date),
                        req.body,
                    );
                    return res.status(200).json(checkin);
                } else {
                    next(new InternalServerError('Ngay da checkin'));
                }
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
