const { expectCt } = require('helmet');
const request = require('supertest');

let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../app.js'); });
    afterEach(() => { server.close(); });
    describe('GET /', () => {
        it('should get all genres', async() => {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        });
    });
});