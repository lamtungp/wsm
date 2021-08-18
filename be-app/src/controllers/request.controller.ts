import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import NotFoundError from '../commons/http-errors/NotFoundError';
import messages from '../commons/messages';
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
    return next(new BadRequestError(messages.request.getRequestFailure));
  };

  public getListRequest = async (req: Request, res: Response, next: NextFunction) => {
    const requests = await this.request.getRequestsAccount(Number(req.params.userId));
    if (!!requests) {
      return responseSuccess(res, requests);
    }
    return next(new BadRequestError(messages.request.getRequestFailure));
  };

  public getListRequestOfStaff = async (req: Request, res: Response, next: NextFunction) => {
    const manager = await this.user.findUser(String(req.query.emailManager));
    if (!!manager) {
      const requests = await this.request.getRequestsStaff(manager.departmentId, 'user');
      if (!!requests) {
        return responseSuccess(res, requests);
      }
      return next(new BadRequestError(messages.request.getRequestFailure));
    }
    return next(new NotFoundError('Manager account does not exist'));
  };

  public getListRequestByState = async (req: Request, res: Response, next: NextFunction) => {
    const requests = await this.request.getRequestByState(String(req.query.state));
    if (!!requests) {
      return responseSuccess(res, requests);
    }
    return next(new BadRequestError(messages.request.getRequestFailure));
  };

  public findRequestById = async (req: Request, res: Response, next: NextFunction) => {
    const request = await this.request.getRequestById(Number(req.params.requestId));
    if (!!request) {
      return responseSuccess(res, request);
    }
    return next(new BadRequestError(messages.request.getRequestFailure));
  };

  public addRequest = async (req: Request, res: Response, next: NextFunction) => {
    const request = await this.request.createRequest(req.body);
    if (!!request) {
      return responseSuccess(res, request);
    }
    return next(new BadRequestError(messages.request.addRequestFailure));
  };

  public updateForRequest = async (req: Request, res: Response, next: NextFunction) => {
    const find_request = await this.request.getRequestById(Number(req.params.requestId));
    if (!!find_request) {
      const request = await this.request.updateRequest(req.body, Number(req.params.requestId));
      if (!!request) {
        return responseSuccess(res, { message: messages.request.updateRequestSuccess });
      }
      return next(new BadRequestError(messages.request.updateRequestFailure));
    }
    return next(new NotFoundError(messages.request.requestNotExists));
  };

  public deleteOneRequest = async (req: Request, res: Response, next: NextFunction) => {
    const find_request = await this.request.getRequestById(Number(req.params.requestId));
    if (!!find_request) {
      const request = await this.request.deleteRequestById(Number(req.params.requestId));
      if (!!request) {
        return responseSuccess(res, { message: messages.request.deleteRequestSuccess });
      }
      return next(new BadRequestError(messages.request.deleteRequestFailure));
    }
    return next(new NotFoundError(messages.request.requestNotExists));
  };
}
