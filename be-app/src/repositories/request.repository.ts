import { Op } from 'sequelize';
import requestModel from '../models/request.model';
import { RequestStatic } from '../models/request.model.d';

export default class RequestRepository {
    private request: RequestStatic;
    static instance: RequestRepository;

    constructor(request: RequestStatic) {
        this.request = request;
    }

    static getInstance() {
        if (!RequestRepository.instance) {
            this.instance = new RequestRepository(requestModel);
        }
        return RequestRepository.instance;
    }

    public async getRequests(): Promise<any> {
        const requests = await this.request.findAll({});
        return requests;
    }

    public async getRequestsAccount(userID: number): Promise<any> {
        const requests = await this.request.findAll({ where: { userID } });
        return requests;
    }

    public async getRequestById(id: number): Promise<any> {
        const request = await this.request.findOne({
            where: { id },
        });
        return request;
    }

    public async getRequestByIdAccount(userID: number): Promise<any> {
        const request = await this.request.findOne({
            where: { userID },
        });
        return request;
    }

    public async createRequest(value: any): Promise<any> {
        const request = await this.request.create(value);
        return request;
    }
}
