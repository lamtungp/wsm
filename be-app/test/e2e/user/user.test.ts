process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import departmentModel from '../../../src/models/department.model';
import userModel from '../../../src/models/user.model';
import Bcrypt from '../../../src/lib/bcrypt';

const userValue = require('../../mocks/user/user.json');
const departmentValue = require('../../mocks/department/department.json');
const tokenAdmin = require('../../mocks/user/token.json').tokenAdmin;

describe('Test User', async () => {
    let departmentId: number = 0;
    let managerId: number = 0;

    beforeEach(async () => {
        try {
            const hashPasswordAdmin = await Bcrypt.generateHashPassword(userValue.admin.password);
            const hashPasswordManager = await Bcrypt.generateHashPassword(userValue.manager.password);
            const department = await departmentModel.create(departmentValue.initial);

            await userModel.create({
                ...userValue.admin,
                password: hashPasswordAdmin,
                departmentId: department.id,
            });
            const manager = await userModel.create({
                ...userValue.manager,
                password: hashPasswordManager,
                departmentId: department.id,
            });
            departmentId = department.id;
            managerId = manager.id;
        } catch (error) {
            console.log(error.message);
        }
    });

    it('should always pass', () => {
        expect(true).to.equal(true);
    });

    it('API health-check', async () => {
        const res = await request(app).get('/api/v1/health-check');
        expect(res.text).to.equal('APIs OK !!');
    });

    describe('auth user', async () => {
        it('login success', async () => {
            const res = await request(app)
                .post('/api/v1/auth/user-login')
                .send({ email: userValue.admin.email, password: userValue.admin.password });
            expect(res.statusCode).to.equal(200);
            expect(res.body.token).not.to.an.empty;
        });
    });

    describe('get all user', async () => {
        it('should GET /api/v1/user/get-all-user', async () => {
            const res = await request(app).get('/api/v1/user/get-all-user').set('auth-token', tokenAdmin);
            expect(res.statusCode).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(2);
        });
    });

    describe('get list user', async () => {
        it('should GET /api/v1/user/get-list-user', async () => {
            const res = await request(app)
                .get(`/api/v1/user/get-list-user/${departmentId}`)
                .set('auth-token', tokenAdmin);
            expect(res.statusCode).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(2);
            expect(res.body.error).to.be.empty;
        });
    });

    describe('get list staff', async () => {
        it('should GET /api/v1/user/get-list-staff/:managerId', async () => {
            const res = await request(app)
                .get(`/api/v1/user/get-list-staff/${managerId}`)
                .set('auth-token', tokenAdmin);
            expect(res.statusCode).to.equal(404);
        });
    });

    describe('find user by email', async () => {
        it('should GET /api/v1/user/find-user-by-email', async () => {
            const res = await request(app)
                .get(`/api/v1/user/find-user-by-email?email=${userValue.admin.email}`)
                .set('auth-token', tokenAdmin);
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.empty;
        });
    });

    describe('update user', async () => {
        it('should post /api/v1/user/update-user', async () => {
            const res = await request(app).post(`/api/v1/user/update-user?email=${userValue.admin.email}`).send({
                name: 'Lam',
            });
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal([1]);
        });
    });

    describe('delete user', async () => {
        it('should delete /api/v1/user/delete-user', async () => {
            const res = await request(app).delete(`/api/v1/user/delete-user?email=${userValue.admin.email}`);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal(1);
        });
    });

    describe('create user', () => {
        it('should POST /api/v1/user/create-user', async () => {
            const res = await request(app)
                .post('/api/v1/user/create-user')
                .send({ ...userValue.user, departmentId: departmentId });
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.message).to.deep.equal('User was registered successfully! Please check your email');
            const confirmationCode = res.body.confirmationCode;

            describe('verify user', async () => {
                it('should GET /api/v1/user/confirm/:confirmationCode', async () => {
                    const res = await request(app).get(`/api/v1/user/confirm/${confirmationCode}`);
                    expect(res.statusCode).to.deep.equal(200);
                    expect(res.body).to.deep.equal([1]);
                });
            });

            after(async () => {
                try {
                    await userModel.destroy({ where: {}, truncate: false });
                    await departmentModel.destroy({ where: {}, truncate: false });
                } catch (error) {
                    console.log(error.message);
                }
            });
        });
    });
});
