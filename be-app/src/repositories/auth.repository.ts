// import bcrypt from '../lib/bcrypt';
import { UserAttributes, UserStatic } from '../interfaces/user';

export default class AuthRepository {
    private customer: UserStatic;

    constructor(customer: UserStatic) {
        this.customer = customer;
    }

    /**
     * CUSTOMER
     */

    /**
     * @param  {string} email
     * @param  {string} password
     * @param  {Request} req
     * @returns Promise
     */

    protected async findCustomerByEmail(email: string, password: string): Promise<UserAttributes> {
        const customer = await this.customer.findOne({
            where: {
                email: email,
                password: password,
            },
        });
        return customer;
    }

    protected async checkAuthenticationData(email: string, password: string): Promise<UserAttributes | undefined> {
        const customer = await this.findCustomerByEmail(email, password);
        if (!customer) {
            return undefined;
        }
        return customer;
    }
}
