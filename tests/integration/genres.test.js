const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../app.js'); });
    afterEach(async() => {
        await server.close(),
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
        });

        it('should return a 404 if a genre with a given ID does not exist', async() => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/genres/' + id);
            expect(res.status).toBe(400);
        })
    });

    describe('POST /', () => {
        //Define the happy path, and then, in each test, we change one parameter that
        //clearly aligns with the name of the test
        let token;
        let name;

        const exec = async() => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name }); // ES6 if key and value are same 
        }

        beforeEach(() => {
            token = new User().generateAuthKey();
            name = 'genre1';
        });

        it('should return a 401 if the client is not logged in', async() => {

            token = '';

            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return a 404 if the genre is less than 5 characters', async() => {
            name = '1234';
            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return a 404 if the genre is more than 50 characters', async() => {
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should save the genre if it is valid', async() => {
            await exec();

            const genre = await Genre.find({ name: 'genre1' });

            expect(genre).not.toBeNull();
        });

        it('should return the genre if it is valid', async() => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });


});