process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import departmentModel from '../../../src/models/department.model';
import userModel from '../../../src/models/user.model';
import Bcrypt from '../../../src/lib/bcrypt';

const userValue = require('../../mocks/user/user.json');
const departmentValue = require('../../mocks/department/department.json');

describe('Test Auth', async () => {
    beforeEach(async () => {
        try {
            const hashPasswordAdmin = await Bcrypt.generateHashPassword(userValue.admin.password);
            const department = await departmentModel.create(departmentValue.initial);
            await userModel.create({
                ...userValue.admin,
                password: hashPasswordAdmin,
                departmentId: department.id,
            });
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

        it('login fail with email empty', async () => {
            const res = await request(app)
                .post('/api/v1/auth/user-login')
                .send({ email: '', password: userValue.admin.password });
            expect(res.statusCode).to.equal(500);
        });

        it('login fail with password empty', async () => {
            const res = await request(app)
                .post('/api/v1/auth/user-login')
                .send({ email: userValue.admin.email, password: '' });
            expect(res.statusCode).to.equal(500);
        });

        it('login fail with email and password empty', async () => {
            const res = await request(app).post('/api/v1/auth/user-login').send({ email: '', password: '' });
            expect(res.statusCode).to.equal(500);
        });
    });

    afterEach(async () => {
        try {
            await userModel.destroy({ where: {}, truncate: false });
            await departmentModel.destroy({ where: {}, truncate: false });
        } catch (error) {
            console.log(error.message);
        }
    });
});
