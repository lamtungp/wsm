import { Op } from 'sequelize';
import checkedModel from '../models/checked.model';
import { CheckedStatic } from '../models/checked.model.d';

export default class CheckedRepository {
    private checked: CheckedStatic;
    static instance: CheckedRepository;

    constructor(checked: CheckedStatic) {
        this.checked = checked;
    }
    static getInstance() {
        if (!CheckedRepository.instance) {
            this.instance = new CheckedRepository(checkedModel);
        }
        return CheckedRepository.instance;
    }
    public async getCheckeds(): Promise<any> {
        const checkeds = await this.checked.findAll({});
        return checkeds;
    }

    public async getListCheckedById(userID: number): Promise<any> {
        const checked = await this.checked.findAll({
            where: { userID },
        });
        return checked;
    }

    public async getCheckedByIdAccount(userID: number, day: string): Promise<any> {
        const checked = await this.checked.findOne({
            where: { userID, day },
        });
        return checked;
    }

    public async createChecked(value: any): Promise<any> {
        const checked = await this.checked.create(value);
        return checked;
    }

    public async updateChecked(day: string, userID: number, value: any): Promise<any> {
        console.log(`${day} ${value}`);
        const checked = await this.checked.update(value, { where: { day, userID } });
        return checked;
    }
}
