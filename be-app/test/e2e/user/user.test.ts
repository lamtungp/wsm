process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import departmentModel from '../../../src/models/department.model';
import userModel from '../../../src/models/user.model';
import Bcrypt from '../../../src/lib/bcrypt';
import checkinModel from '../../../src/models/checkin.model';

const userValue = require('../../mocks/user/user.json');
const checkinValue = require('../../mocks/checkin/checkin.json');
const departmentValue = require('../../mocks/department/department.json');
const token = require('../../mocks/user/token.json');

describe('Test User', async () => {
    let departmentId: number = 0;
    let managerEmail: string = '';

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
            await checkinModel.create({ ...checkinValue.create, userId: manager.id });

            departmentId = department.id;
            managerEmail = manager.email;
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

    describe('get all user', async () => {
        it('should GET /api/v1/user/get-all-user', async () => {
            const res = await request(app)
                .get('/api/v1/user/get-all-user')
                .set('auth-token', token.tokenAdmin)
                .set('Authorization', `Bearer ${token.tokenAdmin}`);
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
                .set('auth-token', token.tokenAdmin)
                .set('Authorization', `Bearer ${token.tokenAdmin}`);
            expect(res.statusCode).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(2);
            expect(res.body.error).to.be.empty;
        });
    });

    describe('get list staff', async () => {
        it('get list staff with token wrong', async () => {
            const res = await request(app)
                .get(`/api/v1/user/get-list-staff?email=${managerEmail}`)
                .set('auth-token', token.tokenAdmin)
                .set('Authorization', `Bearer ${token.tokenAdmin}`);
            expect(res.statusCode).to.equal(400);
        });

        it('get list staff with token manager', async () => {
            const res = await request(app)
                .get(`/api/v1/user/get-list-staff?email=${managerEmail}`)
                .set('auth-token', token.tokenManager)
                .set('Authorization', `Bearer ${token.tokenManager}`);
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(0);
        });
    });

    describe('get staff with checkin', async () => {
        it('should GET /api/v1/user/get-staff-with-checkin', async () => {
            const date = '8-2021';
            const res = await request(app)
                .get(`/api/v1/user/get-staff-with-checkin?email=${userValue.manager.email}&date=${date}`)
                .set('auth-token', token.tokenAdmin)
                .set('Authorization', `Bearer ${token.tokenAdmin}`);
            expect(res.statusCode).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(1);
            expect(res.body.error).to.be.empty;
        });
    });

    describe('find user by email', async () => {
        it('should GET /api/v1/user/find-user-by-email', async () => {
            const res = await request(app)
                .get(`/api/v1/user/find-user-by-email?email=${userValue.admin.email}`)
                .set('auth-token', token.tokenAdmin)
                .set('Authorization', `Bearer ${token.tokenAdmin}`);
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.empty;
        });
    });

    describe('update user', async () => {
        it('should post /api/v1/user/update-user', async () => {
            const res = await request(app)
                .post(`/api/v1/user/update-user?email=${userValue.admin.email}`)
                .send({
                    name: 'Lam',
                })
                .set('auth-token', token.tokenManager)
                .set('Authorization', `Bearer ${token.tokenManager}`);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal([1]);
        });
    });

    describe('delete user', async () => {
        it('should delete /api/v1/user/delete-user', async () => {
            const res = await request(app)
                .delete(`/api/v1/user/delete-user?email=${userValue.admin.email}`)
                .set('auth-token', token.tokenAdmin)
                .set('Authorization', `Bearer ${token.tokenAdmin}`);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal(1);
        });
    });

    describe('create user', () => {
        it('should POST /api/v1/user/create-user', async () => {
            const res = await request(app)
                .post('/api/v1/user/create-user')
                .set('auth-token', token.tokenAdmin)
                .set('Authorization', `Bearer ${token.tokenAdmin}`)
                .send({ ...userValue.user, departmentId: departmentId });
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.message).to.deep.equal('User was registered successfully! Please check your email');
        });
    });

    describe('reset password', async () => {
        let email: string = '';
        before(async () => {
            try {
                const user = await userModel.create({ ...userValue.user, confirmationCode: 'abcd' });
                email = user.email;
            } catch (error) {
                console.log(error.message);
            }
        });
        it('should GET /api/v1/confirm/reset-password', async () => {
            const res = await request(app)
                .post(`/api/v1/confirm/reset-password`)
                .send({ email: email, password: 'asdgasd' })
                .set('auth-token', token.tokenAdmin);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.message).to.deep.equal('Successfully! Please check your email');
        });
    });

    describe('verify user', async () => {
        let confirmationCode: string = '';
        before(async () => {
            try {
                const user = await userModel.create({ ...userValue.user, confirmationCode: 'abcd' });
                confirmationCode = user.confirmationCode;
            } catch (error) {
                console.log(error.message);
            }
        });
        it('should GET /api/v1/confirm/account/:confirmationCode', async () => {
            const res = await request(app)
                .get(`/api/v1/confirm/account/${confirmationCode}`)
                .set('auth-token', token.tokenManager)
                .set('Authorization', `Bearer ${token.tokenManager}`);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal([1]);
        });
    });

    afterEach(async () => {
        try {
            await checkinModel.destroy({ where: {}, truncate: false });
            await userModel.destroy({ where: {}, truncate: false });
            await departmentModel.destroy({ where: {}, truncate: false });
        } catch (error) {
            console.log(error.message);
        }
    });
});
