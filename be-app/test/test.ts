import { expect } from 'chai';
import app from '../src/index';
import { agent as request } from 'supertest';

describe('Test', () => {
    it('should always pass', () => {
        expect(true).to.equal(true);
    });
    it('API Health-check', async () => {
        const res = await request(app).get('/api/v1/health-check');
        // console.log(res);
        expect(res.text).to.equal('APIs OK !!');
    });

    describe('auth login', () => {
        it('should POST /api/v1/auth/user-login', async () => {
            const res = await request(app)
                .post('/api/v1/auth/user-login')
                .send({ email: 'lampt2404@gmail.com', password: '123456' });
            expect(res.status).to.equal(200);
            const token = res.body.token;
            describe('user test', () => {
                it('should GET /api/v1/user/get-all-user', async () => {
                    const res = await request(app).get('/api/v1/user/get-all-user').set('auth-token', token);
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('array');
                    expect(res.body.error).to.be.empty;
                });
                it('should GET /api/v1/user/get-list-user/:departmentId', async () => {
                    const res = await request(app).get('/api/v1/user/get-list-user/1').set('auth-token', token);
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('array');
                    expect(res.body.error).to.be.empty;
                });
                it('should GET /api/v1/user/get-list-staff/:managerId', async () => {
                    const res = await request(app).get('/api/v1/user/get-list-staff/57').set('auth-token', token);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.error).to.be.empty;
                });
                it('should GET /api/v1/user/find-user-by-id/:id', async () => {
                    const res = await request(app).get('/api/v1/user/find-user-by-id/56').set('auth-token', token);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.empty;
                });
                it('should POST /api/v1/user/create-user', async () => {
                    const res = await request(app).post('/api/v1/user/create-user').set('auth-token', token).send({
                        email: 'lamtung240420@gmail.com',
                        password: '123456',
                        name: 'lam',
                        gender: 'male',
                        role: 'user',
                        dob: '2000-04-20',
                        departmentId: '1',
                    });
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.empty;
                });
            });
        });
    });
});
