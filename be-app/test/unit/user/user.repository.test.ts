process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import sinon from 'sinon';
import UserRepository from '../../../src/repositories/user.repository';
import userModel from '../../../src/models/user.model';

const userAllMock = require('../../mocks/user/user_all.json');
const staffListMock = require('../../mocks/user/staff_list.json');
const userListMock = require('../../mocks/user/user_list.json');
const userMock = require('../../mocks/user/user_update.json');

console.log(typeof userListMock);

describe('UserRepository', function () {
    let sandbox: sinon.SinonSandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should alway pass', () => {
        expect(true).to.equal(true);
    });

    describe('createUser', function () {
        it('should add a new user to the db', async () => {
            const stubValue = {
                id: 1,
                email: 'tunglamldk@gmail.com',
                password: '123456',
                name: 'Pham Tung Lam',
                gender: 'male',
                dob: '2000-04-24',
                dayIn: '2021-07-05',
                vacationsDay: 0,
                role: 'admin',
                departmentId: 1,
                createdAt: '2021-07-26T17:12:07.000Z',
                updatedAt: '2021-07-27T03:38:53.000Z',
            };

            const stub = sandbox.stub(userModel, 'create').resolves(Object(stubValue));
            const userRepository = new UserRepository(userModel);
            const user = await userRepository.createUser(stubValue);
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.email).to.equal(stubValue.email);
            expect(user.password).to.equal(stubValue.password);
            expect(user.name).to.equal(stubValue.name);
            expect(user.gender).to.equal(stubValue.gender);
            expect(user.dob).to.equal(stubValue.dob);
            expect(user.dayIn).to.equal(stubValue.dayIn);
            expect(user.vacationsDay).to.equal(stubValue.vacationsDay);
            expect(user.role).to.equal(stubValue.role);
            expect(user.departmentId).to.equal(stubValue.departmentId);
            expect(user.createdAt).to.equal(stubValue.createdAt);
            expect(user.updatedAt).to.equal(stubValue.updatedAt);
        });
    });

    describe('getUser', () => {
        it('should get all user from the db', async () => {
            const stub = sandbox.stub(userModel, 'findAll').resolves(userAllMock);
            const userRepository = new UserRepository(userModel);
            const users = await userRepository.getUsers();
            expect(stub.calledOnce).to.be.true;
            expect(users).to.be.an('array');
            expect(users.length).to.equal(1);
        });

        it('should get list user of Division 1 for admin from the db', async () => {
            const stub = sandbox.stub(userModel, 'findAll').resolves(userListMock);
            const userRepository = new UserRepository(userModel);
            const users = await userRepository.getListUser(1);
            expect(stub.calledOnce).to.be.true;
            expect(users).to.be.an('array');
            expect(users.length).not.to.equal(0);
        });

        it('should get list staff of Division 1 for manager from the db', async () => {
            const stub = sandbox.stub(userModel, 'findAll').resolves(staffListMock);
            const userRepository = new UserRepository(userModel);
            const user = await userRepository.getListStaff(1, 'user');
            expect(stub.calledOnce).to.be.true;
            expect(user).to.be.an('array');
            expect(user.length).not.to.equal(0);
        });
    });

    describe('deleteUser', () => {
        it('should delete user from db', async () => {
            const stub = sinon.stub(userModel, 'destroy').resolves(1);
            const userRepository = new UserRepository(userModel);
            const deleteUser = await userRepository.deleteUser(1);
            expect(stub.calledOnce).to.be.true;
            expect(deleteUser).to.equal(1);
        });
    });

    describe('updateUser', () => {
        it('should update user to db', async () => {
            const updateValue = {
                name: 'Lam',
            };
            const stub = sinon.stub(userModel, 'update').resolves(userMock);
            const userRepository = new UserRepository(userModel);
            const user = await userRepository.updateUser(updateValue, 1);
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(1);
            expect(user.name).to.equal(updateValue.name);
        });
    });
});
