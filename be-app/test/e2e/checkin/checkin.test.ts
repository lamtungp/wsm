process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import userModel from '../../../src/models/user.model';
import checkinModel from '../../../src/models/checkin.model';

const token = require('../../mocks/user/token.json');

const userValue = require('../../mocks/user/user.json');
const checkinValue = require('../../mocks/checkin/checkin.json');

describe('Test Checkin', async () => {
    let userId: number = 0;

    beforeEach(async () => {
        try {
            const user = await userModel.create({ ...userValue.manager, confirmationCode: 'abcd', status: 'actived' });
            await checkinModel.create({ ...checkinValue.initial, userId: user.id });
            userId = user.id;
        } catch (error) {
            console.log(error.message);
        }
    });

    afterEach(async () => {
        try {
            await checkinModel.destroy({ where: {}, truncate: false });
            await userModel.destroy({ where: {}, truncate: false });
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

    describe('get list checkin', async () => {
        it('should GET /api/v1/checkin/get-list-checkin', async () => {
            const res = await request(app)
                .get(`/api/v1/checkin/get-list-checkin/${userId}`)
                .set('auth-token', token.tokenManager);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(1);
        });
    });

    describe('get list checkin with date', async () => {
        it('should GET /api/v1/checkin/get-list-checkin-with-date', async () => {
            const res = await request(app)
                .get(`/api/v1/checkin/get-list-checkin-with-date/${userId}?date=2021-08-02`)
                .set('auth-token', token.tokenManager);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.deep.equal(1);
        });
    });

    describe('find checkin', async () => {
        it('should GET /api/v1/checkin/find-checkin', async () => {
            const initial = checkinValue.initial;
            const res = await request(app)
                .get(`/api/v1/checkin/find-checkin/${userId}?date=${initial.date}`)
                .set('auth-token', token.tokenManager);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.checkin).to.deep.equal(initial.checkin);
            expect(res.body.checkout).to.deep.equal(initial.checkout);
            expect(res.body.date).to.deep.equal(initial.date);
        });
    });

    describe('update checkin', async () => {
        it('should POST /api/v1/checkin/update-checkin', async () => {
            const initial = checkinValue.initial;
            const update = checkinValue.update;
            const res = await request(app)
                .post(`/api/v1/checkin/update-checkin?userId=${userId}&date=${initial.date}`)
                .send(update)
                .set('auth-token', token.tokenManager);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body).to.deep.equal([1]);
        });
    });
});
