import { Request, Response } from 'express';
import { generateToken } from '../lib/passports';
import AuthRepository from '../repositories/auth.repository';

export default class AuthController extends AuthRepository {
    public userLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userData = await this.checkAuthenticationData(email, password);
        console.log(userData.id);
        if (!!userData) {
            if (userData.status === 'actived') {
                const token = generateToken(userData);
                return res.status(200).json({
                    token: token,
                    role: userData.role,
                    id: userData.id,
                    vacationDay: userData.vacationsDay,
                });
            } else {
                return res.status(500).json({ token: null });
            }
        } else {
            return res.status(500).json({ token: null });
        }
    };
}
