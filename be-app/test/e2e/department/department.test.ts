process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import departmentModel from '../../../src/models/department.model';

const departmentValue = require('../../mocks/department/department.json');
const token = require('../../mocks/user/token.json');

describe('Test Department', async () => {
    let id: number = 0;

    beforeEach(async () => {
        try {
            const department = await departmentModel.create(departmentValue.initial);
            id = department.id;
        } catch (error) {
            console.log(error.message);
        }
    });

    afterEach(async () => {
        try {
            await departmentModel.destroy({ where: {}, truncate: false });
        } catch (error) {
            console.log(error);
        }
    });

    it('should always pass', () => {
        expect(true).to.equal(true);
    });

    it('API health-check', async () => {
        const res = await request(app).get('/api/v1/health-check');
        expect(res.text).to.equal('APIs OK !!');
    });

    describe('create department', async () => {
        it('should POST /api/v1/department/create-department', async () => {
            const createValue = departmentValue.create;
            const res = await request(app)
                .post('/api/v1/department/create-department')
                .set('auth-token', token.tokenAdmin)
                .send(createValue);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.name).to.deep.equal(createValue.name);
            expect(res.body.description).to.deep.equal(createValue.description);
        });
    });

    describe('find one department', async () => {
        it('should GET /api/v1/department/find-department-by-id/:id', async () => {
            const res = await request(app)
                .get(`/api/v1/department/find-department-by-id/${id}`)
                .set('auth-token', token.tokenAdmin);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.name).to.deep.equal(departmentValue.create.name);
            expect(res.body.description).to.deep.equal(departmentValue.create.description);
        });
    });

    describe('get all department', async () => {
        it('should GET /api/v1/department/get-all-department', async () => {
            const res = await request(app)
                .get('/api/v1/department/get-all-department')
                .set('auth-token', token.tokenAdmin);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(1);
        });
    });

    describe('update department', async () => {
        it('should POST /api/v1/department/update-department/:id', async () => {
            const updateValue = departmentValue.update;
            const res = await request(app)
                .post(`/api/v1/department/update-department/${id}`)
                .set('auth-token', token.tokenAdmin)
                .send(updateValue);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal([1]);
        });
    });

    describe('delete department', async () => {
        it('should POST /api/v1/department/delete-department/:id', async () => {
            const res = await request(app)
                .delete(`/api/v1/department/delete-department/${id}`)
                .set('auth-token', token.tokenAdmin);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal(1);
        });
    });
});
