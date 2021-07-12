import { Request, Response } from 'express';
import { generateToken } from '../lib/passport';
import AuthRepository from '../repositories/auth.repository';

export default class AuthController extends AuthRepository {
    public userLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const customerData = await this.checkAuthenticationData(email, password);
        if (customerData) {
            const token = generateToken(customerData);
            return res.status(200).json(token);
        } else {
            return res.status(500).json({ token: null });
        }
    };
}
