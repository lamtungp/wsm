process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import sinon from 'sinon';
import UserRepository from '../../../src/repositories/user.repository';
import userModel from '../../../src/models/user.model';

const userListMock = require('../../mocks/user/user_list.json');
const userValue = require('../../mocks/user/user.json');

describe('UserRepository', () => {
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

    describe('get instance', () => {
        it('UserRepository.instance exist', () => {
            const user = new UserRepository(userModel);
            const instance = UserRepository.getInstance();
            expect(user).to.deep.equal(instance);
        });
    });

    describe('createUser', () => {
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

    describe('get all user', () => {
        it('should get all user from the db', async () => {
            const allUser = userListMock.userList;
            const stub = sandbox.stub(userModel, 'findAll').resolves(allUser);
            const userRepository = new UserRepository(userModel);
            const users = await userRepository.getUsers();
            expect(stub.calledOnce).to.be.true;
            expect(users).to.be.an('array');
            expect(users.length).to.equal(1);
        });
    });

    describe('get list user', () => {
        it('should get list user', async () => {
            const listUser = userListMock.userList;
            const stub = sandbox.stub(userModel, 'findAll').resolves(listUser);
            const userRepository = new UserRepository(userModel);
            const users = await userRepository.getListUser(1);
            expect(stub.calledOnce).to.be.true;
            expect(users).to.be.an('array');
            expect(users.length).to.deep.equal(1);
        });
    });

    describe('get list staff', () => {
        it('should get list staff', async () => {
            const listStaff = userListMock.userList;
            const stub = sandbox.stub(userModel, 'findAll').resolves(listStaff);
            const userRepository = new UserRepository(userModel);
            const users = await userRepository.getListStaff(1, 'user');
            expect(stub.calledOnce).to.be.true;
            expect(users).to.be.an('array');
            expect(users.length).to.deep.equal(1);
        });
    });

    describe('get list staff with checkin', () => {
        it('should get list staff with checkin ', async () => {
            const listStaff = userListMock.listStaffCheckin;
            const stub = sandbox.stub(userModel, 'findAll').resolves(listStaff);
            const userRepository = new UserRepository(userModel);
            const users = await userRepository.getStaffWithCheckin(1, '8-2021');
            expect(stub.calledOnce).to.be.true;
            expect(users).to.be.an('array');
            expect(users.length).to.deep.equal(1);
            expect(users[0].checkin.length).to.deep.equal(1);
            expect(users[0].checkin[0].checkin).to.deep.equal('9:00');
            expect(users[0].checkin[0].checkout).to.deep.equal('18:00');
            expect(users[0].checkin[0].date).to.deep.equal('2021-08-02');
        });
    });

    describe('get user by email', () => {
        it('email valid', async () => {
            const userMock = userValue.update;
            const stub = sandbox.stub(userModel, 'findOne').resolves(userMock);
            const userRepository = new UserRepository(userModel);
            const user = await userRepository.getUserByEmail('lampt2404@gmail.com');
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(userMock.id);
            expect(user.email).to.equal(userMock.email);
            expect(user.password).to.equal(userMock.password);
            expect(user.name).to.equal(userMock.name);
            expect(user.gender).to.equal(userMock.gender);
            expect(user.dob).to.equal(userMock.dob);
            expect(user.dayIn).to.equal(userMock.dayIn);
            expect(user.vacationsDay).to.equal(userMock.vacationsDay);
            expect(user.role).to.equal(userMock.role);
            expect(user.departmentId).to.equal(userMock.departmentId);
            expect(user.createdAt).to.equal(userMock.createdAt);
            expect(user.updatedAt).to.equal(userMock.updatedAt);
        });

        it('email invalid', async () => {
            const stub = sandbox.stub(userModel, 'findOne').resolves(undefined);
            const userRepository = new UserRepository(userModel);
            const user = await userRepository.getUserByEmail('');
            expect(stub.calledOnce).to.be.false;
            expect(user).to.equal(undefined);
        });
    });

    describe('find user by confirm code', () => {
        it('should get user by confirm code', async () => {
            const userMock = userValue.update;
            const stub = sandbox.stub(userModel, 'findOne').resolves(userMock);
            const userRepository = new UserRepository(userModel);
            const user = await userRepository.findUserByConfirmCode('abcd');
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(userMock.id);
            expect(user.email).to.equal(userMock.email);
            expect(user.password).to.equal(userMock.password);
            expect(user.name).to.equal(userMock.name);
            expect(user.gender).to.equal(userMock.gender);
            expect(user.dob).to.equal(userMock.dob);
            expect(user.dayIn).to.equal(userMock.dayIn);
            expect(user.vacationsDay).to.equal(userMock.vacationsDay);
            expect(user.role).to.equal(userMock.role);
            expect(user.departmentId).to.equal(userMock.departmentId);
            expect(user.createdAt).to.equal(userMock.createdAt);
            expect(user.updatedAt).to.equal(userMock.updatedAt);
        });
    });

    describe('update user', () => {
        it('should update user to db', async () => {
            const updateValue = {
                name: 'Lam',
            };
            const stub = sandbox.stub(userModel, 'update').resolves(userValue.update);
            const userRepository = new UserRepository(userModel);
            const user = await userRepository.updateUser(updateValue, userValue.update.email);
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(1);
            expect(user.name).to.equal(updateValue.name);
        });
    });

    describe('delete user', () => {
        it('should delete user from db', async () => {
            const stub = sandbox.stub(userModel, 'destroy').resolves(1);
            const userRepository = new UserRepository(userModel);
            const deleteUser = await userRepository.deleteUser(userValue.update.email);
            expect(stub.calledOnce).to.be.true;
            expect(deleteUser).to.equal(1);
        });
    });
});
