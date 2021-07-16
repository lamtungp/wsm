import { Request, Response } from 'express';
import CheckedRepository from '../repositories/checked.repository';

export default class CheckedController {
    private checked: CheckedRepository;

    constructor() {
        this.checked = CheckedRepository.getInstance();
    }

    public getListCheckeds = async (req: Request, res: Response) => {
        try {
            const checkeds = await this.checked.getChecked();
            return res.status(200).json(checkeds);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findCheckedById = async (req: Request, res: Response) => {
        try {
            const checked = await this.checked.getCheckedById(Number(req.params.id));
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findCheckedByAccountId = async (req: Request, res: Response) => {
        try {
            const checked = await this.checked.getCheckedById(Number(req.params.id));
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public addChecked = async (req: Request, res: Response) => {
        try {
            const checked = await this.checked.createChecked(req.body);
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public updateCheckeds = async (req: Request, res: Response) => {
        try {
            const userChecked = await this.checked.getCheckedByIdAccount(
                Number(req.query.userID),
                String(req.query.day),
            );
            // console.log(userChecked);
            if (userChecked !== null) {
                const checked = await this.checked.updateChecked(
                    String(req.query.day),
                    Number(req.query.userID),
                    req.body,
                );
                return res.status(200).json(checked);
            } else {
                const checked = await this.checked.createChecked(req.body);
                return res.status(200).json(checked);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };
}
