import { expect } from 'chai';
import app from '../../src/app';
import { agent as request } from 'supertest';
import departmentModel from '../../src/models/department.model';
import userModel from '../../src/models/user.model';
import Bcrypt from '../../src/lib/bcrypt';
import { DepartmentAttributes } from '../../src/models/department.model.d';
import { departments } from '../seeds/department.seed';
import { users } from '../seeds/user.seed';
import { UserAttributes } from '../../src/models/user.model.d';

const userValue = require('../mocks/user/user.json');

describe('Test Auth', async () => {
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
          await userModel.create({ ...item, password: hashPassword, departmentId: departmentId[0] });
        }),
      );
    } catch (error) {
      console.log(error.message);
    }
  });

  afterEach(async () => {
    try {
      await userModel.destroy({ where: {}, truncate: false });
      await departmentModel.destroy({ where: {}, truncate: false });
      departmentId = [];
    } catch (error) {
      console.log(error.message);
    }
  });

  it('API health-check', async () => {
    const res = await request(app).get('/api/v1/health-check');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('APIs OK!!');
  });

  describe('auth user', async () => {
    it('login success', async () => {
      const res = await request(app)
        .post('/api/v1/auth/user-login')
        .send({ email: userValue.admin.email, password: userValue.admin.password });
      expect(res.status).to.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.token).not.to.an.empty;
      expect(res.body.data.role).to.equal('admin');
    });

    it('login fail with email empty', async () => {
      const res = await request(app)
        .post('/api/v1/auth/user-login')
        .send({ email: '', password: userValue.admin.password });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('email is not allowed to be empty');
      expect(res.body.data).to.equal(null);
    });

    it('login fail with password empty', async () => {
      const res = await request(app)
        .post('/api/v1/auth/user-login')
        .send({ email: userValue.admin.email, password: '' });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('password is not allowed to be empty');
      expect(res.body.data).to.equal(null);
    });

    it('login fail with email and password empty', async () => {
      const res = await request(app).post('/api/v1/auth/user-login').send({ email: '', password: '' });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('email is not allowed to be empty');
      expect(res.body.data).to.equal(null);
    });
  });
});
