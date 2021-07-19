import { Op, where } from 'sequelize';
import userModel from '../models/user.model';
import { UserStatic } from '../models/user.model.d';

export default class UserRepository {
    private user: UserStatic;
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

    public async getUserById(id: number): Promise<any> {
        const user = await this.user.findOne({
            attributes: { exclude: ['password', 'role'] },
            where: { id },
        });
        return user;
    }

    public async createUser(value: any): Promise<any> {
        const checked = await this.user.create(value);
        return checked;
    }

    public async updateUser(value: any, id: number): Promise<any> {
        const checked = await this.user.update(value, { where: { id } });
        return checked;
    }
}
