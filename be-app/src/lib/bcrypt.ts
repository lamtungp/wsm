import bcrypt from 'bcrypt';
import config from '../../config/env';

class Bcrypt {
    private salt: string;

    constructor(salt: string) {
        this.salt = salt;
    }

    public async generateHashPassword(password: string): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    public async comparePassword(password: string, hashPassword: string): Promise<any> {
        return await bcrypt.compare(password, hashPassword);
    }
}

export default new Bcrypt(config.salt);
