import { NextFunction, Request, Response } from 'express';
import CheckinRepository from '../repositories/checkin.repository';

export default class CheckinController {
    private checkin: CheckinRepository;

    constructor() {
        this.checkin = CheckinRepository.getInstance();
    }

    public getListCheckin = async (req: Request, res: Response, next: NextFunction) => {
        const checkins = await this.checkin.getListCheckinById(Number(req.params.userId));
        if (!!checkins) {
            return res.status(200).json(checkins);
        }
        return res.status(200).json({ message: 'Not found' });
    };

    public getListCheckinWithDate = async (req: Request, res: Response, next: NextFunction) => {
        const checkins = await this.checkin.getCheckinWithDate(Number(req.params.userId), String(req.query.date));
        if (!!checkins) {
            return res.status(200).json(checkins);
        }
        return res.status(200).json({ message: 'Not found' });
    };

    public findCheckinByUserIdDate = async (req: Request, res: Response, next: NextFunction) => {
        const checkin = await this.checkin.getCheckinByUserIdDate(Number(req.params.userId), String(req.query.date));
        if (!!checkin) {
            return res.status(200).json(checkin);
        }
        return res.status(200).json({ message: 'Not found' });
    };

    public updateCheckins = async (req: Request, res: Response, next: NextFunction) => {
        const userCheckin = await this.checkin.getCheckinByUserIdDate(Number(req.query.userId), String(req.query.date));
        if (!!userCheckin) {
            if (!!!userCheckin.checkout && !!userCheckin.checkin) {
                const checkin = await this.checkin.updateCheckin(
                    Number(req.query.userId),
                    String(req.query.date),
                    req.body,
                );
                return res.status(200).json(checkin);
            }
            return res.status(200).json({ message: 'Availabled checkin' });
        } else {
            const checkin = await this.checkin.createCheckin(req.body);
            return res.status(200).json(checkin);
        }
    };
}
