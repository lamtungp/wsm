process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../src/index';
import { agent as request } from 'supertest';
import departmentModel from '../../src/models/department.model';
import { departments } from '../seeds/department.seed';
import { DepartmentAttributes } from '../../src/models/department.model.d';
import userModel from '../../src/models/user.model';

const departmentValue = require('../../mocks/department/department.json');
const userValue = require('../../mocks/user/user.json');
const token = require('../../mocks/user/token.json');

describe('Test Department', async () => {
  let departmentId: number[] = [];

  beforeEach(async () => {
    try {
      await Promise.all(
        departments.map(async (item: DepartmentAttributes) => {
          const department = await departmentModel.create(item);
          departmentId.push(department.id);
        }),
      );
      await userModel.create({ ...userValue.admin, departmentId: departmentId[0] });
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
      console.log(error);
    }
  });

  it('API health-check', async () => {
    const res = await request(app).get('/api/v1/health-check');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('APIs OK!!');
  });

  describe('create department', async () => {
    it('should POST /api/v1/department/create-department', async () => {
      const createValue = departmentValue.create;
      console.log(createValue);
      const res = await request(app)
        .post('/api/v1/department/create-department')
        .set('auth-token', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`)
        .send(createValue);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.name).to.deep.equal(createValue.name);
      expect(res.body.data.description).to.deep.equal(createValue.description);
    });
  });

  describe('find one department', async () => {
    it('should GET /api/v1/department/find-department-by-id/:departmentId', async () => {
      const res = await request(app)
        .get(`/api/v1/department/find-department-by-id/${departmentId[0]}`)
        .set('auth-token', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.name).to.deep.equal(departmentValue.create.name);
      expect(res.body.data.description).to.deep.equal(departmentValue.create.description);
    });
  });

  describe('get all department', async () => {
    it('should GET /api/v1/department/get-all-department', async () => {
      const res = await request(app)
        .get('/api/v1/department/get-all-department')
        .set('auth-token', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.deep.equal(4);
    });
  });

  describe('update department', async () => {
    it('should PUT /api/v1/department/update-department/:departmentId', async () => {
      const updateValue = departmentValue.update;
      const res = await request(app)
        .put(`/api/v1/department/update-department/${departmentId[0]}`)
        .set('auth-token', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`)
        .send(updateValue);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.message).to.deep.equal('Update department successfully');
    });
  });

  describe('delete department', async () => {
    it('delete department has members', async () => {
      const res = await request(app)
        .delete(`/api/v1/department/delete-department/${departmentId[0]}`)
        .set('auth-token', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('Deparment has member, not allow to delete!!');
      expect(res.body.data).to.deep.equal(null);
    });
    it("delete department hasn't members", async () => {
      const res = await request(app)
        .delete(`/api/v1/department/delete-department/${departmentId[1]}`)
        .set('auth-token', token.tokenAdmin)
        .set('Authorization', `Bearer ${token.tokenAdmin}`);
      expect(res.status).to.deep.equal(200);
      expect(res.body.error).to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Success');
      expect(res.body.data.message).to.deep.equal('Delete department successfully');
    });
  });
});
