const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/users');
const request = require('supertest');
require('dotenv').config();

const { MONGO_DB_HOST } = process.env;

describe('test user login', () => {
    let server;

    beforeAll(() => {
        server = app.listen(3001);
    });

    afterAll((done) => {
        server.close();
        mongoose.connection.close();
        done();
    });

    beforeEach(async () => {
        await mongoose.connect(MONGO_DB_HOST);
    });

    test('user login successfully', async () => {
        const userRegister = {
            email: 'nomadfreeman@email.com',
            password: '$2a$10$EPDgimSV01cMOLylzasXduhxdpZUsH9J6FWilHox02k3nSTxETOP2',
            avatarURL: 'http://example.com'
        };
        const user = await User.create(userRegister);

        const userLogin = {
            email: 'nomadfreeman@email.com',
            password: '12345678'
        };
        const response = await request(app).post('/api/users/login').send(userLogin);
        expect(response.statusCode).toBe(200);

        const { user: { email, subscription }, token } = response.body;
        expect(token).toEqual(expect.any(String));
        
        const userData = await User.findById(user._id);
        
        expect(userData.token).toEqual(token);
        expect(userData.email).toEqual(email);
        expect(userData.subscription).toEqual(subscription);
    });
});

