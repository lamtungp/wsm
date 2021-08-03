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

    public async getRequestsAccount(userId: number): Promise<any> {
        const requests = await this.request.findAll({ where: { userId } });
        return requests;
    }

    public async getRequestById(id: number): Promise<any> {
        const request = await this.request.findOne({
            where: { id },
        });
        return request;
    }

    public async getRequestByState(state: string): Promise<any> {
        const request = await this.request.findAll({
            where: { state },
        });
        return request;
    }

    public async createRequest(value: any): Promise<any> {
        const request = await this.request.create(value);
        return request;
    }

    public async updateRequest(value: any, id: number): Promise<any> {
        const request = await this.request.update(value, { where: { id } });
        return request;
    }

    public async deleteRequest(id: number): Promise<any> {
        const request = await this.request.destroy({ where: { id } });
        return request;
    }
}
