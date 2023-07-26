import request from 'supertest';
import { app } from '../../app';

it('returns a 200 on successful signin and responds with a cookie ', async () => {

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns a 400 on failed signin', async () => {

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test1@test.com',
            password: 'password1'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when email does not exist', async () => {

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test25@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when email exist but password is incorrect', async () => {

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'passwordddd'
        })
        .expect(400);
});