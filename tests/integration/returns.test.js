const { Rental } = require('../../models/rental');
const mongoose = require('mongoose');

let server;
let customerId;
let movieId;
let rental;

describe('/api/returns', () => {
    it('should return a 401 if client is not logged in', () => {
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
            server.close();
            await Rental.remove({});
        });
    });

    it('should work!', async() => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    })
});