import { Op } from 'sequelize';
import { CheckedStatic } from '../interfaces/checked';

export default class CheckedRepository {
    private checked: CheckedStatic;

    constructor(checked: CheckedStatic) {
        this.checked = checked;
    }

    protected async getChecked(): Promise<any> {
        const checkeds = await this.checked.findAll({});
        return checkeds;
    }

    protected async getCheckedById(id: number): Promise<any> {
        const checked = await this.checked.findOne({
            where: { id },
        });
        return checked;
    }

    protected async createChecked(value: any): Promise<any> {
        const checked = await this.checked.create(value);
        return checked;
    }

    protected async updateChecked(id: number, value: object, userID: {}): Promise<any> {
        const userChecked = await this.checked.findOne({ where: userID });
        const checked = await this.checked.update(value, { where: { id } });
        return checked;
    }
}
