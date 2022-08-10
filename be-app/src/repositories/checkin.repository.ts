import { Sequelize } from 'sequelize';
import checkinModel from '../models/checkin.model';
import { CheckinAttributes, CheckinStatic } from '../models/checkin.model.d';
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

  public async getListCheckinById(userId: number): Promise<CheckinAttributes[]> {
    const checkin = await this.checkin.findAll({
      where: { userId },
    });
    return checkin;
  }

  public async getCheckinByUserIdDate(userId: number, date: string): Promise<CheckinAttributes> {
    const checkin = await this.checkin.findOne({
      where: { userId, date },
    });
    return checkin;
  }

  public async createCheckin(value: any): Promise<CheckinAttributes> {
    const checkin = await this.checkin.create(value);
    return checkin;
  }

  public async updateCheckin(userId: number, date: string, value: object): Promise<any> {
    const checkin = await this.checkin.update(value, { where: { userId, date } });
    return checkin;
  }

  public async deleteCheckinByUserId(userId: number): Promise<any> {
    const checkin = await this.checkin.destroy({ where: { userId } });
    return checkin;
  }
}
