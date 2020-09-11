const request = require('supertest');
const { Genre } = require('../../models/genre');

let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../app.js'); });
    afterEach(async() => {
        server.close(),
            await Genre.remove({})
    });
    describe('GET /', () => {
        it('should get all genres', async() => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);
            //
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();

        });
    });

    describe('GET /:id', () => {
        it('should return a genre if a valid ID is passed', async() => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();
            const id = genre._id;
            const res = await request(server).get('/api/genres/' + id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return a 404 if an invalid ID is passed', async() => {

            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        })
    });


});