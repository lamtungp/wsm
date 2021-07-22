import { NextFunction, Request, Response } from 'express';
import CheckinRepository from '../repositories/checkin.repository';
import HttpError from '../commons/http-errors/InternalServerError';
import InternalServerError from '../commons/http-errors/InternalServerError';

export default class CheckinController {
    private checkin: CheckinRepository;

    constructor() {
        this.checkin = CheckinRepository.getInstance();
    }

    public getAllCheckin = async (req: Request, res: Response, next: NextFunction) => {
        const checkins = await this.checkin.getCheckins();
        if (!!checkins) {
            return res.status(200).json(checkins);
        } else {
            return next(new InternalServerError());
        }
    };

    public getListCheckin = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params.userId);
        const checkin = await this.checkin.getListCheckinById(Number(req.params.userId));
        if (!!checkin) {
            return res.status(200).json(checkin);
        } else {
            return next(new InternalServerError());
        }
    };

    public getListCheckinWithDate = async (req: Request, res: Response, next: NextFunction) => {
        const checkin = await this.checkin.getCheckinWithDate(Number(req.params.userId), String(req.query.date));
        if (!!checkin) {
            return res.status(200).json(checkin);
        } else {
            return next(new InternalServerError());
        }
    };

    public findCheckinByUserIdDate = async (req: Request, res: Response, next: NextFunction) => {
        const checkin = await this.checkin.getCheckinByUserIdDate(Number(req.params.userId), String(req.query.date));
        console.log(!!checkin);
        if (!!checkin) {
            return res.status(200).json(checkin);
        } else {
            return next(new InternalServerError());
        }
    };

    public addCheckin = async (req: Request, res: Response, next: NextFunction) => {
        const checkin = await this.checkin.createCheckin(req.body);
        if (!!checkin) {
            return res.status(200).json(checkin);
        } else {
            return next(new InternalServerError());
        }
    };

    public updateCheckins = async (req: Request, res: Response, next: NextFunction) => {
        const userCheckin = await this.checkin.getCheckinByUserIdDate(Number(req.query.userId), String(req.query.date));
        // console.log(userCheckin);
        if (!!userCheckin) {
            console.log('here');
            if (!!!userCheckin.dataValues.checkout && !!userCheckin.dataValues.checkin) {
                console.log('here1');
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
        next(new InternalServerError());
    };
}
