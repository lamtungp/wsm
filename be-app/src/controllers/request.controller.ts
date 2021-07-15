import { Request, Response } from 'express';
import RequestRepository from '../repositories/request.repository';

export default class RequestController extends RequestRepository {
    public getAllRequest = async (_req: Request, res: Response) => {
        try {
            const requests = await this.getRequests();
            return res.status(200).json(requests);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public getListRequest = async (req: Request, res: Response) => {
        try {
            const requests = await this.getRequestsAccount(Number(req.params.id));
            return res.status(200).json(requests);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findRequestById = async (req: Request, res: Response) => {
        try {
            const request = await this.getRequestById(Number(req.params.id));
            return res.status(200).json(request);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public addRequest = async (req: Request, res: Response) => {
        try {
            const request = await this.createRequest(req.body);
            return res.status(200).json(request);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
