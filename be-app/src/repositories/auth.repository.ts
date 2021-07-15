// import bcrypt from '../lib/bcrypt';
import { UserAttributes, UserStatic } from '../models/user.model.d';

export default class AuthRepository {
    private user: UserStatic;

    constructor(user: UserStatic) {
        this.user = user;
    }

    /**
     * @param  {string} email
     * @param  {string} password
     * @param  {Request} req
     * @returns Promise
     */

    protected async findUserByEmail(email: string, password: string): Promise<UserAttributes> {
        const user = await this.user.findOne({
            where: {
                email: email,
                password: password,
            },
        });
        return user;
    }

    protected async checkAuthenticationData(email: string, password: string): Promise<UserAttributes | undefined> {
        const user = await this.findUserByEmail(email, password);
        if (!user) {
            return undefined;
        }
        return user;
    }
}
