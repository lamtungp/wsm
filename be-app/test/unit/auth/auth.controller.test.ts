process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import sinon from 'sinon';
import userModel from '../../../src/models/user.model';
import AuthController from '../../../src/controllers/auth.controller';
import { NextFunction } from 'express';

const userValue = require('../../mocks/user/user.json');

describe('AuthController', () => {
  let status: sinon.SinonStub, json: sinon.SinonSpy, res: any, sandbox: sinon.SinonSandbox, next: NextFunction;
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should alway pass', () => {
    expect(true).to.equal(true);
  });

  it('should not login a user when email param is not provided', async () => {
    const req = { body: { email: '', password: '12345' } };
    res = {
      success: true,
      data: null,
      message: '',
      httpCode: 400,
    };
    await new AuthController(userModel).userLogin(req, res, next);
    expect(status.calledOnce).to.be.true;
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0]).to.deep.equal({ token: null });
    expect(status.args[0][0]).to.deep.equal(500);
  });

  it('should not login a user when password param is not provided', async () => {
    const req = { body: { email: 'lampt2404@gmail.com', password: '' } };
    await new AuthController(userModel).userLogin(req, res, next);
    expect(status.calledOnce).to.be.true;
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0]).to.deep.equal({ token: null });
    expect(status.args[0][0]).to.deep.equal(500);
  });

  describe('should login a user when email and password is provided and exist', () => {
    it('account is actived', async () => {
      const req = { body: { email: 'lampt2404@gmail.com', password: '123456' } };
      const stub = sandbox.stub(userModel, 'findOne').resolves(userValue.update);
      await new AuthController(userModel).userLogin(req, res, next);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].token).not.to.be.empty;
      expect(status.args[0][0]).to.deep.equal(200);
    });

    it('account is pending', async () => {
      const req = { body: { email: 'lampt2404@gmail.com', password: '123456' } };
      const stub = sandbox.stub(userModel, 'findOne').resolves({ ...userValue.update, status: 'pending' });
      await new AuthController(userModel).userLogin(req, res, next);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0]).to.deep.equal({ token: null });
      expect(status.args[0][0]).to.deep.equal(500);
    });
  });

  it('should not login a user when email and password is provided and not exist', async () => {
    const req = { body: { email: 'lampt2404@gmail.com', password: '123456' } };
    const stub = sandbox.stub(userModel, 'findOne').resolves(undefined);
    await new AuthController(userModel).userLogin(req, res, next);
    expect(stub.calledOnce).to.be.true;
    expect(status.calledOnce).to.be.true;
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0]).to.deep.equal({ token: null });
    expect(status.args[0][0]).to.deep.equal(500);
  });
});
