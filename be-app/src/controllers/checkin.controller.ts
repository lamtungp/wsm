import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import { responseSuccess } from '../helpers/response';
import CheckinRepository from '../repositories/checkin.repository';
import messages from '../commons/messages';
import jwt from 'jsonwebtoken';

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
    const token = req.header('AuthToken');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const userCheckin = await this.checkin.getCheckinByUserIdDate(decodedData.id, req.body.date);
    if (!!userCheckin) {
      if (!!!userCheckin.checkout && !!userCheckin.checkin) {
        if (req.body.checkin) {
          return next(new BadRequestError(messages.checkin.availabled));
        }
        await this.checkin.updateCheckin(decodedData.id, req.body.date, req.body);
        return responseSuccess(res, { message: messages.checkin.updateSuccess });
      }
      return responseSuccess(res, { error: messages.checkin.availabled });
    }
    if (req.body.checkin) {
      const checkin = await this.checkin.createCheckin({ ...req.body, userId: decodedData.id });
      if (!!checkin) {
        return responseSuccess(res, checkin);
      }
      return next(new BadRequestError(messages.checkin.notCheckin));
    }
    return next(new BadRequestError(messages.checkin.createFailure));
  };
}
