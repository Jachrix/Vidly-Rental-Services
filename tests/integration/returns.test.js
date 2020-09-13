const request = require('supertest');
const { Rental } = require('../../models/rental');
const mongoose = require('mongoose');

let server;
let customerId;
let movieId;
let rental;

describe('/api/returns', () => {

    beforeEach(async() => {
        server = require('../../app');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });
        await rental.save();
    });
    afterEach(async() => {
        await server.close();
        await Rental.remove({});
    });


    it('should return a 401 if user is not logged in', async() => {
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId, movieId }); //ES6 wen key and value name thesame

        expect(res.status).toBe(401);
    });
});