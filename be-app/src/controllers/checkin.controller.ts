import { NextFunction, Request, Response } from 'express';
import { responseSuccess } from '../helpers/response';
import CheckinRepository from '../repositories/checkin.repository';

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
    return responseSuccess(res, { message: 'Not found' });
  };

  public findCheckin = async (req: Request, res: Response) => {
    const checkin = await this.checkin.getCheckinByUserIdDate(Number(req.params.userId), String(req.query.date));
    if (!!checkin) {
      return responseSuccess(res, checkin);
    }
    return responseSuccess(res, { message: 'Not found' });
  };

  public createCheckins = async (req: Request, res: Response) => {
    const userCheckin = await this.checkin.getCheckinByUserIdDate(req.body.userId, req.body.date);
    if (!!userCheckin) {
      if (!!!userCheckin.checkout && !!userCheckin.checkin) {
        const checkin = await this.checkin.updateCheckin(req.body.userId, req.body.date, req.body);
        return responseSuccess(res, checkin);
      }
      return responseSuccess(res, { message: 'Availabled checkin' });
    }
    const checkin = await this.checkin.createCheckin(req.body);
    return responseSuccess(res, checkin);
  };
}
