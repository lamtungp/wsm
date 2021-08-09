import { Response } from 'express';
import { generateTokenAuth } from '../lib/passports';
import AuthRepository from '../repositories/auth.repository';

export default class AuthController extends AuthRepository {
    public userLogin = async (req: any, res: Response) => {
        const { email, password } = req.body;

        if (!!!req.body.email || !!!req.body.password) {
            return res.status(500).json({ token: null });
        }
        const userData = await this.checkAuthenticationData(email, password);
        if (!!userData) {
            if (userData.status === 'actived') {
                const token = generateTokenAuth(userData);
                return res.status(200).json({
                    token: token,
                    role: userData.role,
                    id: userData.id,
                    vacationDay: userData.vacationsDay,
                });
            }
            return res.status(500).json({ token: null });
        }
        return res.status(500).json({ token: null });
    };
}
