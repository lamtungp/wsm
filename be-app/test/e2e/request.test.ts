import { expect } from 'chai';
import app from '../../src/app';
import { agent as request } from 'supertest';
import Bcrypt from '../../src/lib/bcrypt';
import userModel from '../../src/models/user.model';
import requestModel from '../../src/models/request.model';
import { users } from '../seeds/user.seed';
import { UserAttributes } from '../../src/models/user.model.d';
import { requests } from '../seeds/request.seed';
import { RequestAttributes } from '../../src/models/request.model.d';
import { departments } from '../seeds/department.seed';
import departmentModel from '../../src/models/department.model';
import { DepartmentAttributes } from '../../src/models/department.model.d';

const token = require('../mocks/user/token.json');
const requestValue = require('../mocks/request/request.json');

describe('Test Request', async () => {
  let userId: number = 0;
  let emailManager: string = '';
  let departmentId: number[] = [];
  let requestId: number[] = [];

  beforeEach(async () => {
    try {
      await Promise.all(
        departments.map(async (item: DepartmentAttributes) => {
          const department = await departmentModel.create(item);
          departmentId.push(department.id);
        }),
      );
      await Promise.all(
        users.map(async (item: UserAttributes) => {
          const hashPassword = await Bcrypt.generateHashPassword(item.password);
          const user = await userModel.create({ ...item, password: hashPassword, departmentId: departmentId[0] });
          if (user.role === 'manager') {
            emailManager = user.email;
            userId = user.id;
          }
        }),
      );
      await Promise.all(
        requests.map(async (item: RequestAttributes) => {
          const request = await requestModel.create({ ...item, userId: userId });
          requestId.push(request.id);
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
      await departmentModel.destroy({ where: {}, truncate: false });
      userId = 0;
      departmentId = [];
      requestId = [];
    } catch (error) {
      console.log(error);
    }
  });

  it('API health-check', async () => {
    const res = await request(app).get('/api/v1/health-check');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('APIs OK!!');
  });

  describe('get all request', async () => {
    it('should GET /api/v1/request/get-all-request', async () => {
      const res = await request(app)
        .get('/api/v1/request/get-all-request')
        .set('AuthToken', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.deep.equal(2);
    });
  });

  describe('get list request', async () => {
    it('should GET /api/v1/request/get-list-request', async () => {
      const res = await request(app)
        .get(`/api/v1/request/get-list-request`)
        .set('AuthToken', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(401);
      expect(res.body.success).to.equal(false);
      expect(res.body.data).to.equal(null);
    });
  });

  describe('get list request of staff', async () => {
    it('should GET /api/v1/request/get-list-request-of-staff', async () => {
      const res = await request(app)
        .get(`/api/v1/request/get-list-request-of-staff`)
        .set('AuthToken', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.deep.equal(0);
    });
  });

  describe('find request by id', async () => {
    it('should GET /api/v1/request/find-request-by-id', async () => {
      const value = requestValue.initial;
      const res = await request(app)
        .get(`/api/v1/request/find-request-by-id/${requestId[0]}`)
        .set('AuthToken', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.deep.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.data).to.equal(null);
    });
  });

  describe('find request by state', async () => {
    it('should GET /api/v1/request/find-request-by-state', async () => {
      const res = await request(app)
        .get('/api/v1/request/find-request-by-state?state=pending')
        .set('AuthToken', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.deep.equal(2);
    });
  });

  describe('create request', async () => {
    it('should POST /api/v1/request/create-request', async () => {
      const value = requestValue.create;
      const res = await request(app)
        .post('/api/v1/request/create-request')
        .set('AuthToken', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`)
        .send(value);
      console.log(res.body);
      expect(res.status).to.deep.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.data).to.equal(null);
    });
  });

  describe('update request', async () => {
    it('should PUT /api/v1/request/update-form-request', async () => {
      const update = requestValue.updateForm;
      const res = await request(app)
        .put(`/api/v1/request/update-form-request/${requestId[0]}`)
        .set('AuthToken', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`)
        .send(update);
      expect(res.statusCode).to.deep.equal(404);
      expect(res.body.success).to.equal(false);
      expect(res.body.data).to.equal(null);
    });

    it('should PUT /api/v1/request/update-handler-request', async () => {
      const update = requestValue.updateHandler;
      const res = await request(app)
        .put(`/api/v1/request/update-handler-request/${requestId[0]}`)
        .set('AuthToken', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`)
        .send(update);
      expect(res.statusCode).to.deep.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.equal('Update request successfully');
    });
  });

  describe('delete request', async () => {
    it('should POST /api/v1/request/delete-request', async () => {
      const res = await request(app)
        .delete(`/api/v1/request/delete-request/${requestId[0]}`)
        .set('AuthToken', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.statusCode).to.deep.equal(404);
      expect(res.body.success).to.equal(false);
      expect(res.body.data).to.equal(null);
    });
  });
});
