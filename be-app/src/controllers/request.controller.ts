import { Request, Response } from 'express';
import RequestRepository from '../repositories/request.repository';
import UserRepository from '../repositories/user.repository';

export default class RequestController {
    private request: RequestRepository;
    private user: UserRepository;

    constructor() {
        this.request = RequestRepository.getInstance();
        this.user = UserRepository.getInstance();
    }

    public getAllRequest = async (_req: Request, res: Response) => {
        try {
            const requests = await this.request.getRequests();
            return res.status(200).json(requests);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public getListRequest = async (req: Request, res: Response) => {
        try {
            const requests = await this.request.getRequestsAccount(Number(req.params.id));
            return res.status(200).json(requests);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findRequestById = async (req: Request, res: Response) => {
        try {
            const request = await this.request.getRequestById(Number(req.params.id));
            return res.status(200).json(request);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public addRequest = async (req: Request, res: Response) => {
        try {
            const request = await this.request.createRequest(req.body);
            return res.status(200).json(request);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
