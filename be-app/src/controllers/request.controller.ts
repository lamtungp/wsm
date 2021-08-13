import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import InternalServerError from '../commons/http-errors/InternalServerError';
import NotFoundError from '../commons/http-errors/NotFoundError';
import { responseSuccess } from '../helpers/response';
import RequestRepository from '../repositories/request.repository';
import UserRepository from '../repositories/user.repository';

export default class RequestController {
  private request: RequestRepository;
  private user: UserRepository;

  constructor() {
    this.request = RequestRepository.getInstance();
    this.user = UserRepository.getInstance();
  }

  public getAllRequest = async (_req: Request, res: Response, next: NextFunction) => {
    const requests = await this.request.getRequests();
    if (!!requests) {
      return responseSuccess(res, requests);
    }
    return next(new BadRequestError('Get request failure'));
  };

  public getListRequest = async (req: Request, res: Response, next: NextFunction) => {
    const requests = await this.request.getRequestsAccount(Number(req.params.userId));
    if (!!requests) {
      return responseSuccess(res, requests);
    }
    return next(new BadRequestError('Get request failure'));
  };

  public getListRequestOfStaff = async (req: Request, res: Response, next: NextFunction) => {
    const manager = await this.user.findUser(String(req.query.emailManager));
    if (!!manager) {
      const requests = await this.request.getRequestsStaff(manager.departmentId, 'user');
      if (!!requests) {
        return responseSuccess(res, requests);
      }
      return next(new BadRequestError('Get request of staff failure'));
    }
    return next(new BadRequestError('Manager account does not exist'));
  };

  public getListRequestByState = async (req: Request, res: Response, next: NextFunction) => {
    const requests = await this.request.getRequestByState(String(req.query.state));
    if (!!requests) {
      return responseSuccess(res, requests);
    }
    return next(new BadRequestError('Get request failure'));
  };

  public findRequestById = async (req: Request, res: Response, next: NextFunction) => {
    const request = await this.request.getRequestById(Number(req.params.requestId));
    if (!!request) {
      return responseSuccess(res, request);
    }
    return next(new BadRequestError('Get request failure'));
  };

  public addRequest = async (req: Request, res: Response, next: NextFunction) => {
    const request = await this.request.createRequest(req.body);
    if (!!request) {
      return responseSuccess(res, request);
    }
    return next(new BadRequestError('Add request failure'));
  };

  public updateForRequest = async (req: Request, res: Response, next: NextFunction) => {
    const find_request = await this.request.getRequestById(Number(req.params.requestId));
    if (!!find_request) {
      const request = await this.request.updateRequest(req.body, Number(req.params.requestId));
      if (!!request) {
        return responseSuccess(res, { message: 'Update request successfully' });
      }
      return next(new BadRequestError('Update request failure'));
    }
    return next(new NotFoundError('Request does not exist'));
  };

  public deleteOneRequest = async (req: Request, res: Response, next: NextFunction) => {
    const find_request = await this.request.getRequestById(Number(req.params.requestId));
    if (!!find_request) {
      const request = await this.request.deleteRequestById(Number(req.params.requestId));
      if (!!request) {
        return responseSuccess(res, { message: 'Delete request successfully' });
      }
      return next(new BadRequestError('Delete request failure'));
    }
    return next(new NotFoundError('Request does not exist'));
  };
}
