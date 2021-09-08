import { expect } from 'chai';
import app from '../../src/app';
import { agent as request } from 'supertest';
import departmentModel from '../../src/models/department.model';
import userModel from '../../src/models/user.model';
import Bcrypt from '../../src/lib/bcrypt';
import checkinModel from '../../src/models/checkin.model';
import { users } from '../seeds/user.seed';
import { UserAttributes } from '../../src/models/user.model.d';
import { departments } from '../seeds/department.seed';
import { DepartmentAttributes } from '../../src/models/department.model.d';

const userValue = require('../mocks/user/user.json');
const checkinValue = require('../mocks/checkin/checkin.json');
const token = require('../mocks/user/token.json');

describe('Test User', async () => {
  let departmentId: number[] = [];
  let userId: number = 0;
  let managerEmail: string = '';
  let confirmationCode: string = '';

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
            managerEmail = user.email;
            confirmationCode = user.confirmationCode;
            userId = user.id;
          }
        }),
      );
      await checkinModel.create({ ...checkinValue.create, userId: userId });
    } catch (error) {
      console.log(error.message);
    }
  });

  afterEach(async () => {
    try {
      await checkinModel.destroy({ where: {}, truncate: false });
      await userModel.destroy({ where: {}, truncate: false });
      await departmentModel.destroy({ where: {}, truncate: false });
      departmentId = [];
      confirmationCode = '';
      managerEmail = '';
    } catch (error) {
      console.log(error.message);
    }
  });

  it('API health-check', async () => {
    const res = await request(app).get('/api/v1/health-check');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('APIs OK!!');
  });

  describe('get all user', async () => {
    it('should GET /api/v1/user/get-all-user', async () => {
      const res = await request(app)
        .get('/api/v1/user/get-all-user')
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.length).to.deep.equal(3);
    });
  });

  describe('get list user', async () => {
    it('should GET /api/v1/user/get-list-user', async () => {
      const res = await request(app)
        .get(`/api/v1/user/get-list-user/${departmentId[0]}`)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.length).to.deep.equal(3);
    });
  });

  describe('get list staff', async () => {
    it('get list staff with token wrong', async () => {
      const res = await request(app)
        .get(`/api/v1/user/get-list-staff?email=${managerEmail}`)
        .set('Authorization', `Bearer fdsafadsf`);
      expect(res.status).to.equal(401);
      expect(res.body.success).to.equal(false);
      expect(res.body.data).to.equal(null);
      expect(res.body.message).to.equal('BearerToken Invalid');
    });

    it('get list staff with role invalid', async () => {
      const res = await request(app)
        .get(`/api/v1/user/get-list-staff?email=${managerEmail}`)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.equal(401);
      expect(res.body.success).to.equal(false);
      expect(res.body.data).to.equal(null);
      expect(res.body.message).to.equal('Not permission');
    });

    it('get list staff with token manager', async () => {
      const res = await request(app)
        .get(`/api/v1/user/get-list-staff`)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.deep.equal(3);
    });
  });

  describe('get staff with checkin', async () => {
    it('should GET /api/v1/user/get-staff-with-checkin', async () => {
      const date = '8-2021';
      const res = await request(app)
        .get(`/api/v1/user/get-staff-with-checkin?email=${managerEmail}&date=${date}`)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.deep.equal(1);
    });
  });

  describe('find user by email', async () => {
    it('should GET /api/v1/user/find-user-by-email', async () => {
      const res = await request(app)
        .get(`/api/v1/user/find-user-by-email?email=${userValue.admin.email}`)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.email).to.equal(userValue.admin.email);
      expect(res.body.data.name).to.equal(userValue.admin.name);
      expect(res.body.data.gender).to.equal(userValue.admin.gender);
      expect(res.body.data.role).to.equal(userValue.admin.role);
    });
  });

  describe('update user', async () => {
    it('should put /api/v1/user/update-user-role-admin', async () => {
      const res = await request(app)
        .put(`/api/v1/user/update-user-role-admin?email=${userValue.manager.email}`)
        .send({
          name: 'Lam',
        })
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.equal('Update user successfully');
    });

    it('should put /api/v1/user/update-user-role-user', async () => {
      const res = await request(app)
        .put(`/api/v1/user/update-user-role-user`)
        .send({
          name: 'LamTung',
        })
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.equal('Update user successfully');
    });
  });

  describe('delete user', async () => {
    it('should delete /api/v1/user/delete-user', async () => {
      const res = await request(app)
        .delete(`/api/v1/user/delete-user?email=${userValue.admin.email}`)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.deep.equal('Delete user successfully');
    });
  });

  describe('create user', () => {
    it('create user existed', async () => {
      const res = await request(app)
        .post('/api/v1/user/create-user')
        .set('Authorization', `Bearer ${token.tokenAdmin}`)
        .send({ ...userValue.manager, departmentId: departmentId[0] });
      expect(res.status).to.deep.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('Email Address already in use');
      expect(res.body.data).to.deep.equal(null);
    });

    it('create user successfully', async () => {
      const res = await request(app)
        .post('/api/v1/user/create-user')
        .set('Authorization', `Bearer ${token.tokenAdmin}`)
        .send({ ...userValue.user, departmentId: departmentId[0] });
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.equal('User was registered successfully! Please check your email');
    });
  });

  describe('reset password', async () => {
    it('should PUT /api/v1/confirm/reset-password', async () => {
      const res = await request(app)
        .put(`/api/v1/confirm/reset-password`)
        .send({ email: userValue.manager.email })
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.deep.equal('Reset password successfully! Please check your email');
    });
  });

  describe('verify user', async () => {
    it('should PUT /api/v1/confirm/account/:confirmationCode', async () => {
      const res = await request(app)
        .put(`/api/v1/confirm/account/${confirmationCode}`)
        .set('Authorization', `Bearer ${token.tokenManager}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.deep.equal('Account was actived');
    });
  });
});
