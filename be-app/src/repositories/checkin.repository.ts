import { Op } from 'sequelize';
import checkinModel from '../models/checkin.model';
import { CheckinStatic } from '../models/checkin.model.d';

export default class CheckinRepository {
    private checkin: CheckinStatic;
    static instance: CheckinRepository;

    constructor(checkin: CheckinStatic) {
        this.checkin = checkin;
    }
    static getInstance() {
        if (!CheckinRepository.instance) {
            this.instance = new CheckinRepository(checkinModel);
        }
        return CheckinRepository.instance;
    }
    public async getCheckins(): Promise<any> {
        const checkins = await this.checkin.findAll({});
        return checkins;
    }

    public async getListCheckinById(userId: number): Promise<any> {
        const checkin = await this.checkin.findAll({
            where: { userId },
        });
        return checkin;
    }

    public async getCheckinByIdAccount(userId: number, date: string): Promise<any> {
        const checkin = await this.checkin.findOne({
            where: { userId, date },
        });
        return checkin;
    }

    public async createCheckin(value: any): Promise<any> {
        const checkin = await this.checkin.create(value);
        return checkin;
    }

    public async updateCheckin(date: string, userId: number, value: any): Promise<any> {
        const checkin = await this.checkin.update(value, { where: { date, userId } });
        return checkin;
    }
}
