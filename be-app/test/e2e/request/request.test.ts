process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';
import userModel from '../../../src/models/user.model';
import requestModel from '../../../src/models/request.model';
import { users } from '../../seeds/user.seed';
import { UserAttributes } from '../../../src/models/user.model.d';
import { requests } from '../../seeds/request.seed';
import { RequestAttributes } from '../../../src/models/request.model.d';

const token = require('../../mocks/user/token.json');
const userValue = require('../../mocks/user/user.json');
const requestValue = require('../../mocks/request/request.json');

describe('Test Request', async () => {
  let userId: number[] = [];
  let id: number[] = [];

  beforeEach(async () => {
    try {
      Promise.all(
        users.map(async (item: UserAttributes) => {
          const user = await userModel.create(item);
          userId.push(user.id);
        }),
      );
      Promise.all(
        requests.map(async (item: RequestAttributes) => {
          const request = await requestModel.create(item);
          id.push(request.id);
        }),
      );
    } catch (error) {
      console.log(error.message);
    }
  });

  afterEach(async () => {
    try {
      await requestModel.destroy({ where: {}, truncate: false });
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

  describe('get all request', async () => {
    it('should GET /api/v1/request/get-all-request', async () => {
      const res = await request(app)
        .get('/api/v1/request/get-all-request')
        .set('auth-token', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.statusCode).to.deep.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.deep.equal(1);
    });
  });

  describe('get list request', async () => {
    it('should GET /api/v1/request/get-list-request', async () => {
      const res = await request(app)
        .get(`/api/v1/request/get-list-request/${userId}`)
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.statusCode).to.deep.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.deep.equal(1);
    });
  });

  describe('find request by id', async () => {
    it('should GET /api/v1/request/find-request-by-id', async () => {
      const value = requestValue.initial;
      const res = await request(app)
        .get(`/api/v1/request/find-request-by-id/${id[0]}`)
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
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
      const res = await request(app)
        .get('/api/v1/request/find-request-by-state?state=Pending')
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
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
        .send({ ...value, userId: userId[0] })
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
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
      const res = await request(app)
        .post(`/api/v1/request/update-request/${id[0]}`)
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`)
        .send(update);
      expect(res.statusCode).to.deep.equal(200);
      expect(res.body).to.deep.equal([1]);
    });
  });

  describe('delete request', async () => {
    it('should POST /api/v1/request/delete-request', async () => {
      const res = await request(app)
        .delete(`/api/v1/request/delete-request/${id[0]}`)
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.statusCode).to.deep.equal(200);
      expect(res.body).to.deep.equal(1);
    });
  });
});
