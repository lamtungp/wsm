process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import userModel from '../../../src/models/user.model';
import checkinModel from '../../../src/models/checkin.model';

const token = require('../../mocks/user/token.json');
const userValue = require('../../mocks/user/user.json');
const checkinValue = require('../../mocks/checkin/checkin.json');

describe('Test Request', async () => {
    let userId = 0;
    before(async () => {
        try {
            const user = await userModel.create({ ...userValue.manager, confirmationCode: 'abcd', status: 'actived' });
            const checkin = await checkinModel.create({ ...checkinValue.initial, userId: user.id });
            userId = user.id;
            // console.log('checkin ==============>', checkin);
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

    it('should GET /api/v1/checkin/get-list-checkin', async () => {
        const res = await request(app).get(`/api/v1/checkin/get-list-checkin/${userId}`);
        expect(res.statusCode).to.deep.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.deep.equal(1);
    });

    it('should GET /api/v1/checkin/get-list-checkin-with-date', async () => {
        const res = await request(app).get(`/api/v1/checkin/get-list-checkin-with-date/${userId}?date=2021-08-02`);
        expect(res.statusCode).to.deep.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.deep.equal(1);
    });

    it('should GET /api/v1/checkin/find-checkin', async () => {
        const initial = checkinValue.initial;
        const res = await request(app).get(`/api/v1/checkin/find-checkin/${userId}?date=${initial.date}`);
        expect(res.statusCode).to.deep.equal(200);
        expect(res.body.checkin).to.deep.equal(initial.checkin);
        expect(res.body.checkout).to.deep.equal(initial.checkout);
        expect(res.body.date).to.deep.equal(initial.date);
    });

    it('should POST /api/v1/checkin/update-checkin', async () => {
        const initial = checkinValue.initial;
        const update = checkinValue.update;
        const res = await request(app)
            .post(`/api/v1/checkin/update-checkin?userId=${userId}&date=${initial.date}`)
            .send(update);
        expect(res.statusCode).to.deep.equal(200);
        expect(res.body).to.deep.equal([1]);
    });

    after(async () => {
        try {
            await checkinModel.destroy({ where: {}, truncate: false });
            await userModel.destroy({ where: {}, truncate: false });
        } catch (error) {
            console.log(error);
        }
    });
});
