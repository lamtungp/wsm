import { Op } from 'sequelize';
import { UserStatic } from '../interfaces/user';

export default class UserRepository {
    private user: UserStatic;

    constructor(user: UserStatic) {
        this.user = user;
    }

    protected async getUser(): Promise<any> {
        const users = await this.user.findAll({});
        return users;
    }
}
