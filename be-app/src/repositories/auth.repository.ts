import { UserAttributes, UserStatic } from '../models/user.model.d';
import Bcrypt from '../lib/bcrypt';
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

  public async findUserByEmail(email: string): Promise<UserAttributes> {
    const user = await this.user.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  public async checkAuthenticationData(email: string, password: string): Promise<UserAttributes | undefined> {
    const user = await this.findUserByEmail(email);
    if (!!!user) {
      return undefined;
    }
    const compare = await Bcrypt.comparePassword(password, user.password);
    if (!compare) return undefined;
    return user;
  }
}
