import { Op, where, Sequelize } from 'sequelize';
import sequelize from 'sequelize/types/lib/sequelize';
import checkinModel from '../models/checkin.model';
import { CheckinStatic } from '../models/checkin.model.d';
import userModel from '../models/user.model';
import { UserStatic } from '../models/user.model.d';

export default class UserRepository {
    private user: UserStatic;
    private checkin: CheckinStatic = checkinModel;
    static instance: UserRepository;

    constructor(user: UserStatic) {
        this.user = user;
    }

    static getInstance() {
        if (!UserRepository.instance) {
            this.instance = new UserRepository(userModel);
        }
        return UserRepository.instance;
    }

    public async getUsers(): Promise<any> {
        const users = await this.user.findAll({});
        return users;
    }

    public async getListUser(departmentId: number): Promise<any> {
        const users = await this.user.findAll({ where: { departmentId } });
        return users;
    }

    public async getListStaff(departmentId: number, role: string): Promise<any> {
        const users = await this.user.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { departmentId, role },
        });
        return users;
    }

    public async getStaffWithCheckin(departmentId: number, role: string, date: string): Promise<any> {
        const users = await this.user.findAll({
            attributes: ['id', 'email', 'name', 'gender'],
            where: { departmentId, role },
            include: [
                {
                    model: this.checkin,
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

    public async getUserById(id: number): Promise<any> {
        const user = await this.user.findOne({
            attributes: { exclude: ['password'] },
            where: { id },
        });
        return user;
    }

    public async createUser(value: any): Promise<any> {
        const user = await this.user.create(value);
        return user;
    }

    public async updateUser(value: any, id: number): Promise<any> {
        const user = await this.user.update(value, { where: { id } });
        return user;
    }
}
