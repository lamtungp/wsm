import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import { responseSuccess } from '../helpers/response';
import CheckinRepository from '../repositories/checkin.repository';
import messages from '../commons/messages';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

export default class CheckinController {
  private checkin: CheckinRepository;

  constructor() {
    this.checkin = CheckinRepository.getInstance();
  }

  public getListCheckin = async (req: Request, res: Response) => {
    const checkins = await this.checkin.getListCheckinById(Number(req.params.userId));
    if (!!checkins) {
      return responseSuccess(res, checkins);
    }
    return responseSuccess(res, { message: messages.checkin.notFound });
  };

  public findCheckin = async (req: Request, res: Response) => {
    const checkin = await this.checkin.getCheckinByUserIdDate(Number(req.params.userId), String(req.query.date));
    if (!!checkin) {
      return responseSuccess(res, checkin);
    }
    return responseSuccess(res, { message: messages.checkin.notFound });
  };

  public createCheckins = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const handleDate = (date: string) => {
      return dayjs(date).format('YYYY-MM-DD');
    };
    const handleTime = (time: string) => {
      return dayjs(time).format('H:mm');
    };
    const date = handleDate(new Date().toDateString());
    const time = handleTime(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
    const userCheckin = await this.checkin.getCheckinByUserIdDate(decodedData.id, date);
    if (!!userCheckin) {
      if (!!!userCheckin.checkout && !!userCheckin.checkin) {
        await this.checkin.updateCheckin(decodedData.id, date, { date: date, checkout: time });
        return responseSuccess(res, { message: messages.checkin.updateSuccess });
      }
      return responseSuccess(res, { error: messages.checkin.availabled });
    }
    const checkin = await this.checkin.createCheckin({ date: date, checkin: time, userId: decodedData.id });
    if (!!checkin) {
      return responseSuccess(res, checkin);
    }
    return next(new BadRequestError(messages.checkin.createFailure));
  };
}
