process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../src/index';
import { agent as request } from 'supertest';
import Bcrypt from '../../src/lib/bcrypt';
import { departments } from '../seeds/department.seed';
import { DepartmentAttributes } from '../../src/models/department.model.d';
import departmentModel from '../../src/models/department.model';
import { users } from '../seeds/user.seed';
import userModel from '../../src/models/user.model';
import { UserAttributes } from '../../src/models/user.model.d';
import { checkins } from '../seeds/checkin.seed';
import checkinModel from '../../src/models/checkin.model';
import { CheckinAttributes } from '../../src/models/checkin.model.d';

const token = require('../mocks/user/token.json');
const checkinValue = require('../mocks/checkin/checkin.json');

describe('Test Checkin', async () => {
  let userId: number = 0;
  let emailManager: string = '';
  let departmentId: number[] = [];

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
        checkins.map(async (item: CheckinAttributes) => {
          await checkinModel.create({ ...item, userId: userId });
        }),
      );
    } catch (error) {
      console.log(error.message);
    }
  });

  afterEach(async () => {
    try {
      await checkinModel.destroy({ where: {}, truncate: false });
      await userModel.destroy({ where: {}, truncate: false });
      await departmentModel.destroy({ where: {}, truncate: false });
      userId = 0;
      emailManager = '';
      departmentId = [];
    } catch (error) {
      console.log(error);
    }
  });

  it('API health-check', async () => {
    const res = await request(app).get('/api/v1/health-check');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('APIs OK!!');
  });

  describe('get list checkin', async () => {
    it('should GET /api/v1/checkin/get-list-checkin', async () => {
      const res = await request(app)
        .get(`/api/v1/checkin/get-list-checkin/${userId}`)
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.deep.equal(2);
    });
  });

  describe('find checkin', async () => {
    it('should GET /api/v1/checkin/find-checkin', async () => {
      const initial = checkinValue.initial;
      const res = await request(app)
        .get(`/api/v1/checkin/find-checkin/${userId}?date=${initial.date}`)
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.checkin).to.deep.equal(initial.checkin);
      expect(res.body.data.checkout).to.deep.equal(initial.checkout);
      expect(res.body.data.date).to.deep.equal(initial.date);
    });
  });

  describe('create checkin', async () => {
    it('should POST /api/v1/checkin/create-checkin', async () => {
      const initial = checkinValue.initial;
      const update = checkinValue.update;
      const res = await request(app)
        .post(`/api/v1/checkin/create-checkin?userId=${userId}&date=${initial.date}`)
        .send({ ...update, userId: userId, date: initial.date })
        .set('auth-token', token.tokenManager)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.equal('Update checkin successfully');
    });
  });
});
