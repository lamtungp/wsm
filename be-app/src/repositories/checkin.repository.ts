import { Op, Sequelize } from 'sequelize';
import checkinModel from '../models/checkin.model';
import { CheckinStatic } from '../models/checkin.model.d';
import moment from 'moment';
import { UserStatic } from '../models/user.model.d';
import userModel from '../models/user.model';
export default class CheckinRepository {
    private checkin: CheckinStatic;
    private user: UserStatic = userModel;
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

    public async getListCheckinById(userId: number): Promise<any> {
        const checkin = await this.checkin.findAll({
            where: { userId },
        });
        return checkin;
    }

    public async getCheckinWithDate(userId: number, date: string): Promise<any> {
        const users = await this.checkin.findAll({
            where:
                (Sequelize.where(
                    Sequelize.fn(
                        'CONCAT',
                        Sequelize.fn('MONTH', Sequelize.col('date')),
                        '-',
                        Sequelize.fn('YEAR', Sequelize.col('date')),
                    ),
                    date,
                ),
                { userId }),
        });
        return users;
    }

    public async getCheckinByUserIdDate(userId: number, date: string): Promise<any> {
        const checkin = await this.checkin.findOne({
            where: { userId, date },
        });
        return checkin;
    }

    public async createCheckin(value: any): Promise<any> {
        const checkin = await this.checkin.create(value);
        return checkin;
    }

    public async updateCheckin(userId: number, date: string, value: any): Promise<any> {
        // console.log(userId, ' ', date, ' ', value);
        const checkin = await this.checkin.update(value, { where: { userId, date } });
        return checkin;
    }

    public async deleteCheckin(userId: number): Promise<any> {
        const checkin = await this.checkin.destroy({ where: { userId } });
        return checkin;
    }
}
