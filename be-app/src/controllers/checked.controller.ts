import { Request, Response } from 'express';
import CheckedRepository from '../repositories/checked.repository';

export default class CheckedController {
    private checkedController: CheckedRepository;

    constructor() {
        this.checkedController = CheckedRepository.getInstance();
    }

    public getListCheckeds = async (req: Request, res: Response) => {
        try {
            const checkeds = await this.checkedController.getChecked();
            return res.status(200).json(checkeds);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findCheckedById = async (req: Request, res: Response) => {
        try {
            const checked = await this.checkedController.getCheckedById(Number(req.params.id));
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public addChecked = async (req: Request, res: Response) => {
        try {
            const checked = await this.checkedController.createChecked(req.body);
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public updateCheckeds = async (req: Request, res: Response) => {
        try {
            const checked = await this.checkedController.updateChecked(
                Number(req.params.id),
                req.body,
                req.query.userId,
            );
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
