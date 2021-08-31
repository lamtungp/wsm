import requestModel from '../models/request.model';
import { RequestAttributes, RequestStatic } from '../models/request.model.d';
import userModel from '../models/user.model';

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
    const requests = await this.request.findAll({
      include: {
        model: userModel,
        attributes: ['email'],
      },
    });
    return requests;
  }

  public async getRequestsAccount(userId: number): Promise<RequestAttributes[]> {
    const requests = await this.request.findAll({
      where: { userId },
    });
    return requests;
  }

  public async getRequestsStaff(departmentId: number, role: string): Promise<any[]> {
    const requests = await this.request.findAll({
      include: {
        model: userModel,
        attributes: ['email'],
        where: { departmentId, role },
      },
    });
    return requests;
  }

  public async getRequestByIdUserId(id: number, userId: number): Promise<RequestAttributes> {
    const request = await this.request.findOne({
      where: { id, userId },
    });
    return request;
  }

  public async getRequestById(id: number): Promise<RequestAttributes> {
    const request = await this.request.findOne({
      where: { id },
    });
    return request;
  }

  public async getRequestByState(state: string): Promise<RequestAttributes[]> {
    const request = await this.request.findAll({
      where: { state },
    });
    return request;
  }

  public async createRequest(value: any): Promise<RequestAttributes> {
    const request = await this.request.create(value);
    return request;
  }

  public async updateRequest(value: any, id: number): Promise<any> {
    const request = await this.request.update(value, { where: { id } });
    return request;
  }

  public async deleteRequestByUserId(userId: number): Promise<any> {
    const request = await this.request.destroy({ where: { userId } });
    return request;
  }

  public async deleteRequestById(id: number): Promise<any> {
    const request = await this.request.destroy({ where: { id } });
    return request;
  }
}
