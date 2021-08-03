process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import userModel from '../../../src/models/user.model';
import requestModel from '../../../src/models/request.model';

const token = require('../../mocks/user/token.json');
const userValue = require('../../mocks/user/user.json');
const requestValue = require('../../mocks/request/request.json');

describe('Test Request', async () => {
    let userId: number = 0;
    let id: number = 0;

    beforeEach(async () => {
        try {
            const user = await userModel.create({ ...userValue.manager, confirmationCode: 'abcd', status: 'actived' });
            const request = await requestModel.create({ ...requestValue.initial, userId: user.id });
            userId = user.id;
            id = request.id;
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

    describe('get all request', async () => {
        it('should GET /api/v1/request/get-all-request', async () => {
            const res = await request(app).get('/api/v1/request/get-all-request').set('auth-token', token.tokenAdmin);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(1);
        });
    });

    describe('get list request', async () => {
        it('should GET /api/v1/request/get-list-request', async () => {
            const res = await request(app).get(`/api/v1/request/get-list-request/${userId}`);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(1);
        });
    });

    describe('find request by id', async () => {
        it('should GET /api/v1/request/find-request-by-id', async () => {
            const value = requestValue.initial;
            const res = await request(app).get(`/api/v1/request/find-request-by-id/${id}`);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.nameRequest).to.deep.equal(value.nameRequest);
            expect(res.body.state).to.deep.equal(value.state);
            expect(res.body.startDay).to.deep.equal(value.startDay);
            expect(res.body.endDay).to.deep.equal(value.endDay);
            expect(res.body.phoneNumber).to.deep.equal(value.phoneNumber);
            expect(res.body.reason).to.deep.equal(value.reason);
            expect(res.body.project).to.deep.equal(value.project);
        });
    });

    describe('find request by state', async () => {
        it('should GET /api/v1/request/find-request-by-state', async () => {
            const res = await request(app).get('/api/v1/request/find-request-by-state?state=Pending');
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(1);
        });
    });

    describe('create request', async () => {
        it('should POST /api/v1/request/create-request', async () => {
            const value = requestValue.create;
            const res = await request(app)
                .post('/api/v1/request/create-request')
                .send({ ...value, userId: userId });
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.nameRequest).to.deep.equal(value.nameRequest);
            expect(res.body.state).to.deep.equal(value.state);
            expect(res.body.startDay).to.deep.equal(value.startDay);
            expect(res.body.endDay).to.deep.equal(value.endDay);
            expect(res.body.phoneNumber).to.deep.equal(value.phoneNumber);
            expect(res.body.reason).to.deep.equal(value.reason);
            expect(res.body.project).to.deep.equal(value.project);
        });
    });

    describe('update request', async () => {
        it('should POST /api/v1/request/update-request', async () => {
            const update = requestValue.update;
            const res = await request(app).post(`/api/v1/request/update-request/${id}`).send(update);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal([1]);
        });
    });

    describe('delete request', async () => {
        it('should POST /api/v1/request/delete-request', async () => {
            const res = await request(app).delete(`/api/v1/request/delete-request/${id}`);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal(1);
        });
    });

    afterEach(async () => {
        try {
            await requestModel.destroy({ where: {}, truncate: false });
            await userModel.destroy({ where: {}, truncate: false });
        } catch (error) {
            console.log(error);
        }
    });
});
