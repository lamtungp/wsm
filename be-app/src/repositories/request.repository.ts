import { Op } from 'sequelize';
import { RequestStatic } from '../interfaces/request';

export default class RequestRepository {
    private request: RequestStatic;

    constructor(request: RequestStatic) {
        this.request = request;
    }

    protected async getRequests(): Promise<any> {
        const requests = await this.request.findAll({});
        return requests;
    }

    protected async getRequestsAccount(userID: number): Promise<any> {
        const requests = await this.request.findAll({ where: { userID } });
        return requests;
    }

    protected async getRequestById(id: number): Promise<any> {
        const request = await this.request.findOne({
            where: { id },
        });
        return request;
    }

    protected async createRequest(value: any): Promise<any> {
        const request = await this.request.create(value);
        return request;
    }
}
