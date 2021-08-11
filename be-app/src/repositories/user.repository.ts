import { Sequelize } from 'sequelize';
import checkinModel from '../models/checkin.model';
import userModel from '../models/user.model';
import { UserAttributes, UserStatic } from '../models/user.model.d';

export default class UserRepository {
  private user: UserStatic;
  static instance: UserRepository;

  constructor(user: UserStatic) {
    this.user = user;
  }

  static getInstance() {
    if (!!!UserRepository.instance) {
      this.instance = new UserRepository(userModel);
    }
    return UserRepository.instance;
  }

  public async getUsers(): Promise<any> {
    const users = await this.user.findAll({});
    return users;
  }

  public async getListUser(departmentId: number): Promise<UserAttributes[]> {
    const users = await this.user.findAll({ where: { departmentId } });
    return users;
  }

  public async getListStaff(departmentId: number, role: string): Promise<UserAttributes[]> {
    const users = await this.user.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'confirmationCode'] },
      where: { departmentId, role },
    });
    return users;
  }

  public async getStaffWithCheckin(departmentId: number, date: string): Promise<any[]> {
    const users = await this.user.findAll({
      attributes: ['id', 'email', 'name', 'gender'],
      where: { departmentId },
      include: [
        {
          model: checkinModel,
          where: Sequelize.where(
            Sequelize.fn(
              'CONCAT',
              Sequelize.fn('MONTH', Sequelize.col('date')),
              '-',
              Sequelize.fn('YEAR', Sequelize.col('date')),
            ),
            date,
          ),
        },
      ],
    });
    return users;
  }

  public async getUserByEmail(email: string): Promise<UserAttributes> {
    if (!!!email) {
      return undefined;
    }
    const user = await this.user.findOne({
      attributes: { exclude: ['password'] },
      where: { email },
    });
    return user;
  }

  public async findUserByConfirmCode(confirmationCode: string): Promise<UserAttributes> {
    const user = await this.user.findOne({
      where: { confirmationCode },
    });
    return user;
  }

  public async createUser(value: any): Promise<UserAttributes> {
    const user = await this.user.create(value);
    return user;
  }

  public async updateUser(value: object, email: string): Promise<any> {
    const user = await this.user.update(value, { where: { email } });
    return user;
  }

  public async deleteUser(email: string): Promise<any> {
    const user = await this.user.destroy({ where: { email } });
    return user;
  }
}
