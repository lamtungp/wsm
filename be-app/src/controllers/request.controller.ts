import { NextFunction, Request, Response } from 'express';
import InternalServerError from '../commons/http-errors/InternalServerError';
import NotFoundError from '../commons/http-errors/NotFoundError';
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
      return res.status(200).json(requests);
    }
    next(new InternalServerError());
  };

  public getListRequest = async (req: Request, res: Response, next: NextFunction) => {
    const requests = await this.request.getRequestsAccount(Number(req.params.userId));
    if (!!requests) {
      return res.status(200).json(requests);
    }
    next(new InternalServerError());
  };

  public getListRequestOfStaff = async (req: Request, res: Response, next: NextFunction) => {
    const manager = await this.user.findUser(String(req.query.emailManager));
    if (!!manager) {
      const requests = await this.request.getRequestsStaff(manager.departmentId, 'user');
      if (!!requests) {
        return res.status(200).json(requests);
      }
      next(new NotFoundError());
    }
    next(new InternalServerError());
  };

  public getListRequestByState = async (req: Request, res: Response, next: NextFunction) => {
    const requests = await this.request.getRequestByState(String(req.query.state));
    if (!!requests) {
      return res.status(200).json(requests);
    }
    next(new InternalServerError());
  };

  public findRequestById = async (req: Request, res: Response, next: NextFunction) => {
    const request = await this.request.getRequestById(Number(req.params.id));
    if (!!request) {
      return res.status(200).json(request);
    }
    next(new InternalServerError());
  };

  public addRequest = async (req: Request, res: Response, next: NextFunction) => {
    const request = await this.request.createRequest(req.body);
    if (!!request) {
      return res.status(200).json(request);
    }
    next(new InternalServerError());
  };

  public updateForRequest = async (req: Request, res: Response, next: NextFunction) => {
    const request = await this.request.updateRequest(req.body, Number(req.params.id));
    if (!!request) {
      return res.status(200).json(request);
    }
    next(new InternalServerError());
  };

  public deleteOneRequest = async (req: Request, res: Response, next: NextFunction) => {
    const request = await this.request.deleteRequestById(Number(req.params.id));
    if (!!request) {
      return res.status(200).json(request);
    }
    next(new InternalServerError());
  };
}
