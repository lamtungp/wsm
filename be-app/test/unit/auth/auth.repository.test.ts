process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import sinon from 'sinon';
import userModel from '../../../src/models/user.model';
import AuthRepository from '../../../src/repositories/auth.repository';

const userValue = require('../../mocks/user/user.json');

describe('AuthRepository', () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('find user by email', () => {
    it('user exist', async () => {
      const stubValue = userValue.update;
      const stub = sandbox.stub(userModel, 'findOne').resolves(stubValue);
      const authRepo = new AuthRepository(userModel);
      const user = await authRepo.findUserByEmail(stubValue.email);
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.email).to.equal(stubValue.email);
      expect(user.password).to.equal(stubValue.password);
      expect(user.name).to.equal(stubValue.name);
      expect(user.gender).to.equal(stubValue.gender);
      expect(user.dob).to.equal(stubValue.dob);
      expect(user.dayIn).to.equal(stubValue.dayIn);
      expect(user.vacationsDay).to.equal(stubValue.vacationsDay);
      expect(user.role).to.equal(stubValue.role);
      expect(user.departmentId).to.equal(stubValue.departmentId);
      expect(user.createdAt).to.equal(stubValue.createdAt);
      expect(user.updatedAt).to.equal(stubValue.updatedAt);
    });

    it('user not exist', async () => {
      const stubValue = userValue.update;
      const stub = sandbox.stub(userModel, 'findOne').resolves(undefined);
      const authRepo = new AuthRepository(userModel);
      const user = await authRepo.findUserByEmail(stubValue.email);
      expect(stub.calledOnce).to.be.true;
      expect(user).to.deep.equal(undefined);
    });
  });

  describe('check authenticate', () => {
    it('password invalid', async () => {
      const stubValue = userValue.update;
      const authRepo = new AuthRepository(userModel);
      const stub = sandbox.stub(userModel, 'findOne').resolves(stubValue);
      const user = await authRepo.checkAuthenticationData(stubValue.email, stubValue.password);
      expect(stub.calledOnce).to.be.true;
      expect(user).to.deep.equal(undefined);
    });

    it('password valid', async () => {
      const stubValue = userValue.update;
      const authRepo = new AuthRepository(userModel);
      const stub = sandbox.stub(userModel, 'findOne').resolves(stubValue);
      const user = await authRepo.checkAuthenticationData(stubValue.email, '123456');
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.email).to.equal(stubValue.email);
      expect(user.password).to.equal(stubValue.password);
      expect(user.name).to.equal(stubValue.name);
      expect(user.gender).to.equal(stubValue.gender);
      expect(user.dob).to.equal(stubValue.dob);
      expect(user.dayIn).to.equal(stubValue.dayIn);
      expect(user.vacationsDay).to.equal(stubValue.vacationsDay);
      expect(user.role).to.equal(stubValue.role);
      expect(user.departmentId).to.equal(stubValue.departmentId);
      expect(user.createdAt).to.equal(stubValue.createdAt);
      expect(user.updatedAt).to.equal(stubValue.updatedAt);
    });
  });
});
