import { NextFunction, Request, Response } from 'express';
import CheckinRepository from '../repositories/checkin.repository';
import HttpError from '../commons/http-errors/InternalServerError';
import InternalServerError from '../commons/http-errors/InternalServerError';

export default class CheckinController {
    private checkin: CheckinRepository;

    constructor() {
        this.checkin = CheckinRepository.getInstance();
    }

    public getListCheckin = async (req: Request, res: Response, next: NextFunction) => {
        const checkins = await this.checkin.getListCheckinById(Number(req.params.userId));
        console.log(checkins);
        if (!!checkins) {
            return res.status(200).json(checkins);
        } else {
            return res.status(200).json({ message: 'Not found' });
        }
    };

    public getListCheckinWithDate = async (req: Request, res: Response, next: NextFunction) => {
        const checkins = await this.checkin.getCheckinWithDate(Number(req.params.userId), String(req.query.date));
        // console.log(checkins);
        if (!!checkins) {
            return res.status(200).json(checkins);
        } else {
            return res.status(200).json({ message: 'Not found' });
        }
    };

    public findCheckinByUserIdDate = async (req: Request, res: Response, next: NextFunction) => {
        const checkin = await this.checkin.getCheckinByUserIdDate(Number(req.params.userId), String(req.query.date));
        // console.log(checkin);
        if (!!checkin) {
            return res.status(200).json(checkin);
        } else {
            return res.status(200).json({ message: 'Not found' });
        }
    };

    // public addCheckin = async (req: Request, res: Response, next: NextFunction) => {
    //     const checkin = await this.checkin.createCheckin(req.body);
    //     if (!!checkin) {
    //         return res.status(200).json(checkin);
    //     }
    //     next(new InternalServerError());
    // };

    public updateCheckins = async (req: Request, res: Response, next: NextFunction) => {
        const userCheckin = await this.checkin.getCheckinByUserIdDate(Number(req.query.userId), String(req.query.date));
        // console.log(userCheckin);
        if (!!userCheckin) {
            // console.log('here');
            if (!!!userCheckin.dataValues.checkout && !!userCheckin.dataValues.checkin) {
                const checkin = await this.checkin.updateCheckin(
                    Number(req.query.userId),
                    String(req.query.date),
                    req.body,
                );
                return res.status(200).json(checkin);
            } else {
                return res.status(200).json({ message: 'Availabled checkin' });
            }
        } else {
            const checkin = await this.checkin.createCheckin(req.body);
            return res.status(200).json(checkin);
        }
    };
}
