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
    public async getChecked(): Promise<any> {
        const checkeds = await this.checked.findAll({});
        return checkeds;
    }

    public async getCheckedById(id: number): Promise<any> {
        const checked = await this.checked.findOne({
            where: { id },
        });
        return checked;
    }

    public async createChecked(value: any): Promise<any> {
        const checked = await this.checked.create(value);
        return checked;
    }

    public async updateChecked(id: number, value: object, userID: {}): Promise<any> {
        const userChecked = await this.checked.findOne({ where: userID });
        const checked = await this.checked.update(value, { where: { id } });
        return checked;
    }
}
