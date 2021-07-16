import { Request, Response } from 'express';
import CheckedRepository from '../repositories/checked.repository';

export default class CheckedController {
    private checked: CheckedRepository;

    constructor() {
        this.checked = CheckedRepository.getInstance();
    }

    public getAllChecked = async (req: Request, res: Response) => {
        try {
            const checkeds = await this.checked.getCheckeds();
            return res.status(200).json(checkeds);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public getListChecked = async (req: Request, res: Response) => {
        try {
            const checked = await this.checked.getListCheckedById(Number(req.params.userID));
            return res.status(200).json(checked);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.messages);
        }
    };

    public findCheckedByAccountId = async (req: Request, res: Response) => {
        try {
            const checked = await this.checked.getCheckedByIdAccount(Number(req.params.userID), String(req.query.day));
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
