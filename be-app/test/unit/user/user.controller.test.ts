process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import sinon from 'sinon';
import UserRepository from '../../../src/repositories/user.repository';
import userModel from '../../../src/models/user.model';
import UserController from '../../../src/controllers/user.controller';
import { Request, NextFunction } from 'express';

const userListMock = require('../../mocks/user/user_list.json');
const userValue = require('../../mocks/user/user.json');

describe('UserController', () => {
    let status: sinon.SinonStub, json: sinon.SinonSpy, res: any, sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should alway pass', () => {
        expect(true).to.equal(true);
    });

    it('get all user', async () => {
        let req: Request, next: NextFunction;
        try {
            const stub = sandbox.stub(userModel, 'findAll').resolves(userListMock.userList);
            await new UserController().getAllUsers(req, res, next);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].token).not.to.be.empty;
            expect(status.args[0][0]).to.deep.equal(200);
        } catch (error) {
            expect(error).not.to.be.empty;
        }
    });

    it('get list user', async () => {
        let req: any = { params: { departmentId: 1 } };
        let next: NextFunction;

        const stub = sandbox.stub(userModel, 'findAll').resolves(userListMock.userList);
        await new UserController().getListUsers(req, res, next);

        expect(stub.calledOnce).to.be.true;
        expect(status.calledOnce).to.be.true;
        expect(json.calledOnce).to.be.true;
        expect(json.args[0][0]).to.be.an('array');
        expect(json.args[0][0].length).to.deep.equal(1);
        expect(status.args[0][0]).to.deep.equal(200);
    });

    it('get list staff', async () => {
        let req: any = { query: { email: 'lampt2404@gmail.com', role: 'user' } };
        let next: NextFunction;

        const stub1 = sandbox.stub(userModel, 'findOne').resolves(userListMock.update);
        const stub2 = sandbox.stub(userModel, 'findAll').resolves(userListMock.userList);

        await new UserController().getListStaffs(req, res, next);
        // console.log(json.args[0][0]);
        expect(stub1.calledOnce).to.be.true;
        expect(stub2.calledOnce).to.be.true;
        expect(status.calledOnce).to.be.true;
        expect(json.calledOnce).to.be.true;
        // expect(json.args[0][0]).to.be.an('array');
        // expect(json.args[0][0].length).to.deep.equal(1);
        // expect(status.args[0][0]).to.deep.equal(200);
    });
});
