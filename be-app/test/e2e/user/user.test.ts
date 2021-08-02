process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import departmentModel from '../../../src/models/department.model';
import userModel from '../../../src/models/user.model';

const userValue = require('../../mocks/user/user.json');
const departmentValue = require('../../mocks/department/department.json');
const tokenAdmin = require('../../mocks/user/token.json').tokenAdmin;

describe('Test User With Role Admin', async () => {
    before(async () => {
        try {
            const department = await departmentModel.create(departmentValue.initial);
            await userModel.create({ ...userValue.admin, departmentId: department.id });
            console.log('success', department.toJSON());
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

    describe('1. auth user', async () => {
        it('login success', async () => {
            const res = await request(app)
                .post('/api/v1/auth/user-login')
                .send({ email: userValue.admin.email, password: userValue.admin.password });
            // console.log(res.body);
            expect(res.statusCode).to.equal(200);
            expect(res.body.token).not.to.an.empty;
        });
    });

    it('should GET /api/v1/user/get-all-user', async () => {
        const res = await request(app).get('/api/v1/user/get-all-user').set('auth-token', tokenAdmin);
        expect(res.statusCode).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.deep.equal(1);
    });

    it('should GET /api/v1/user/get-list-user/:departmentId', async () => {
        const res = await request(app).get(`/api/v1/user/get-list-user/1`).set('auth-token', tokenAdmin);
        expect(res.statusCode).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.deep.equal(1);
        expect(res.body.error).to.be.empty;
    });

    it('should GET /api/v1/user/get-list-staff/:managerId', async () => {
        const res = await request(app).get('/api/v1/user/get-list-staff/1').set('auth-token', tokenAdmin);
        expect(res.statusCode).to.equal(404);
    });

    it('should GET /api/v1/user/find-user-by-email', async () => {
        const res = await request(app)
            .get(`/api/v1/user/find-user-by-email?email=${userValue.admin.email}`)
            .set('auth-token', tokenAdmin);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.empty;
    });

    describe('3. update user', async () => {
        it('should post /api/v1/user/update-user', async () => {
            const res = await request(app).post(`/api/v1/user/update-user?email=${userValue.admin.email}`).send({
                name: 'Lam',
            });
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal([1]);
        });
    });

    describe('4. delete user', async () => {
        it('should delete /api/v1/user/delete-user', async () => {
            const res = await request(app).delete(`/api/v1/user/delete-user?email=${userValue.admin.email}`);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal(1);
        });
    });

    describe('5. create user', () => {
        it('should POST /api/v1/user/create-user', async () => {
            const res = await request(app)
                .post('/api/v1/user/create-user')
                .send({ ...userValue.manager, departmentId: 1 });
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.message).to.deep.equal('User was registered successfully! Please check your email');
            const confirmationCode = res.body.confirmationCode;

            console.log(confirmationCode);

            describe('1.1. confirm', async () => {
                it('should GET /api/v1/user/confirm/:confirmationCode', async () => {
                    const res = await request(app).get(`/api/v1/user/confirm/${confirmationCode}`);
                    console.log('status ', res.body);
                    expect(res.statusCode).to.deep.equal(200);
                    expect(res.body).to.deep.equal([1]);
                });
            });
        });
    });
});
