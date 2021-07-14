import { Request, Response } from 'express';
import CheckedRepository from '../repositories/Checked.repository';

export default class CheckedController extends CheckedRepository {
    public getListCheckeds = async (req: Request, res: Response) => {
        try {
            const checkeds = await this.getChecked();
            return res.status(200).json(checkeds);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findCheckedById = async (req: Request, res: Response) => {
        try {
            const checked = await this.getCheckedById(Number(req.params.id));
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public addChecked = async (req: Request, res: Response) => {
        try {
            const checked = await this.createChecked(req.body);
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public updateCheckeds = async (req: Request, res: Response) => {
        try {
            const checked = await this.updateChecked(Number(req.params.id), req.body, req.query.userId);
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
