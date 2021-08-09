import bcrypt from 'bcrypt';
import config from '../../config/env';

class Bcrypt {
    private salt: string;

    constructor(salt: string) {
        this.salt = salt;
    }

    public async generateHashPassword(password: string): Promise<any> {
        const genSalt = await bcrypt.genSalt(Number(this.salt));
        return await bcrypt.hash(password, genSalt);
    }

    public async comparePassword(password: string, hashPassword: string): Promise<any> {
        return await bcrypt.compare(password, hashPassword);
    }
}

export default new Bcrypt(config.salt);
