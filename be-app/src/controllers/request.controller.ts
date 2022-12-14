import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import NotFoundError from '../commons/http-errors/NotFoundError';
import messages from '../commons/messages';
import { responseSuccess } from '../helpers/response';
import RequestRepository from '../repositories/request.repository';
import UserRepository from '../repositories/user.repository';
import jwt from 'jsonwebtoken';
import { sendNewEmail } from '../lib/bullboard';
import config from '../../config';

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
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const requests = await this.request.getRequestsAccount(decodedData.id);
    if (!!requests) {
      return responseSuccess(res, requests);
    }
    return next(new BadRequestError(messages.request.getRequestFailure));
  };

  public getListRequestOfStaff = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const manager = await this.user.findUser(decodedData.email);
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
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const request = await this.request.getRequestByIdUserId(Number(req.params.requestId), decodedData.id);
    if (!!request) {
      return responseSuccess(res, request);
    }
    return next(new BadRequestError(messages.request.getRequestFailure));
  };

  public addRequest = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const request = await this.request.createRequest({ ...req.body, userId: decodedData.id });
    if (!!request) {
      // return res.success(request);
      return responseSuccess(res, request);
    }
    return next(new BadRequestError(messages.request.addRequestFailure));
  };

  public updateFormRequest = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const find_request = await this.request.getRequestByIdUserId(Number(req.params.requestId), decodedData.id);
    if (!!find_request) {
      const request = await this.request.updateRequest(req.body, Number(req.params.requestId));
      if (!!request) {
        return responseSuccess(res, { message: messages.request.updateRequestSuccess });
      }
      return next(new BadRequestError(messages.request.updateRequestFailure));
    }
    return next(new NotFoundError(messages.request.requestNotExists));
  };

  public updateHandlerRequest = async (req: Request, res: Response, next: NextFunction) => {
    const find_request = await this.request.getRequestById(Number(req.params.requestId));
    if (!!find_request) {
      const request = await this.request.updateRequest(req.body, Number(req.params.requestId));
      console.log(req.body);
      if (request) {
        const { mail } = config;
        const options = {
          from: mail.user,
          to: find_request.user.email,
          subject: req.body.state === 'declined' ? 'Y??u c???u ???? b??? t??? ch???i' : 'Y??u c???u ???? ???????c ch???p nh???n',
          html: `<div>
                <h1>${req.body.state === 'declined' ? 'Y??u c???u ???? b??? t??? ch???i' : 'Y??u c???u ???? ???????c ch???p nh???n'}</h1>
                <h2>Hello</h2>
                <p>${
                  req.body.state === 'declined'
                    ? `${req.body.handler} ???? t??? ch???i y??u c???u n??y`
                    : `${req.body.handler} ???? ch???p nh???n y??u c???u `
                }</p>
            </div>`,
        };
        sendNewEmail(options);
        return responseSuccess(res, { message: messages.request.updateRequestSuccess });
      }
      return next(new BadRequestError(messages.request.updateRequestFailure));
    }
    return next(new NotFoundError(messages.request.requestNotExists));
  };

  public deleteOneRequest = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const find_request = await this.request.getRequestByIdUserId(Number(req.params.requestId), decodedData.id);
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
