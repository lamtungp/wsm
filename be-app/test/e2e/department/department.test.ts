process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';

const departmentValue = require('../../mocks/department/department.json');
const token = require('../../mocks/user/token.json');

describe('Test Department', async () => {
    it('should always pass', () => {
        expect(true).to.equal(true);
    });

    it('API health-check', async () => {
        const res = await request(app).get('/api/v1/health-check');
        expect(res.text).to.equal('APIs OK !!');
    });

    describe('1. create department', async () => {
        it('should POST /api/v1/department/create-department', async () => {
            const res = await request(app)
                .post('/api/v1/department/create-department')
                .set('auth-token', token.tokenAdmin)
                .send(departmentValue);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.name).to.deep.equal(departmentValue.name);
            expect(res.body.description).to.deep.equal(departmentValue.description);
        });
    });

    describe('2. find one department', async () => {
        it('should GET /api/v1/department/find-department-by-id/:id', async () => {
            const res = await request(app)
                .get('/api/v1/department/find-department-by-id/1')
                .set('auth-token', token.tokenAdmin);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.name).to.deep.equal(departmentValue.name);
            expect(res.body.description).to.deep.equal(departmentValue.description);
        });
    });

    describe('3. get all department', async () => {
        it('should GET /api/v1/department/get-all-department', async () => {
            const res = await request(app)
                .get('/api/v1/department/get-all-department')
                .set('auth-token', token.tokenAdmin);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(1);
        });
    });

    describe('4. update department', async () => {
        it('should POST /api/v1/department/update-department/:id', async () => {
            const updateValue = {
                description: 'good luck',
            };
            const res = await request(app)
                .post('/api/v1/department/update-department/1')
                .set('auth-token', token.tokenAdmin)
                .send(updateValue);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal([1]);
        });
    });
});
