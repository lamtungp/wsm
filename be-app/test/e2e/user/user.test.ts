process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import app from '../../../src/index';
import { agent as request } from 'supertest';

const userValue = require('../../mocks/user/user.json');

describe('Test User', async () => {
    it('should always pass', () => {
        expect(true).to.equal(true);
    });

    it('API health-check', async () => {
        const res = await request(app).get('/api/v1/health-check');
        expect(res.text).to.equal('APIs OK !!');
    });

    describe('1. create user', async () => {
        it('should POST /api/v1/user/create-user', async () => {
            const res = await request(app).post('/api/v1/user/create-user').send(userValue);
            expect(res.statusCode).to.deep.equal(200);
            expect(res.body.message).to.deep.equal('User was registered successfully! Please check your email');
            const confirmationCode = res.body.confirmationCode;
            // console.log(confirmationCode);

            describe('confirm', async () => {
                it('should GET /api/v1/user/confirm/:confirmationCode', async () => {
                    const res = await request(app).get(`/api/v1/user/confirm/${confirmationCode}`);
                    // console.log('status ', res.body);
                    expect(res.statusCode).to.deep.equal(200);
                    expect(res.body).to.deep.equal([1]);
                });
            });

            describe('2. auth user', async () => {
                it('should POST /api/v1/auth/user-login', async () => {
                    const res = await request(app)
                        .post('/api/v1/auth/user-login')
                        .send({ email: 'lampt2404@gmail.com', password: '123456' });
                    // console.log(res.body);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.token).not.to.an.empty;

                    const token = res.body.token;
                    describe('3. get user', async () => {
                        it('should GET /api/v1/user/get-all-user', async () => {
                            const res = await request(app).get('/api/v1/user/get-all-user').set('auth-token', token);
                            expect(res.statusCode).to.equal(200);
                            expect(res.body).not.to.be.empty;
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.deep.equal(1);
                        });

                        it('should GET /api/v1/user/get-list-user/:departmentId', async () => {
                            const res = await request(app).get('/api/v1/user/get-list-user/1').set('auth-token', token);
                            expect(res.statusCode).to.equal(200);
                            expect(res.body).not.to.be.empty;
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.deep.equal(1);
                            expect(res.body.error).to.be.empty;
                        });

                        it('should GET /api/v1/user/get-list-staff/:managerId', async () => {
                            const res = await request(app)
                                .get('/api/v1/user/get-list-staff/1')
                                .set('auth-token', token);
                            expect(res.statusCode).to.equal(400);
                        });

                        it('should GET /api/v1/user/find-user-by-id/:id', async () => {
                            const res = await request(app)
                                .get('/api/v1/user/find-user-by-id/1')
                                .set('auth-token', token);
                            expect(res.statusCode).to.equal(200);
                            expect(res.body).to.be.an('object');
                            expect(res.body.error).to.be.empty;
                        });
                    });

                    describe('4. update user', async () => {
                        it('should post /api/v1/user/update-user/:userId', async () => {
                            const res = await request(app).post('/api/v1/user/update-user/1').send({
                                name: 'Lam',
                            });
                            expect(res.statusCode).to.deep.equal(200);
                            expect(res.body).to.deep.equal([1]);
                        });
                    });

                    describe('5. delete user', async () => {
                        it('should delete /api/v1/user/delete-user/:userId', async () => {
                            const res = await request(app).delete('/api/v1/user/delete-user/1');
                            expect(res.statusCode).to.deep.equal(200);
                            expect(res.body).to.deep.equal(1);
                        });
                    });
                });
            });
        });
    });
});
