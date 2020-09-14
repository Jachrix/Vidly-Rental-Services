const moment = require('moment');
const request = require('supertest');
const { Rental } = require('../../models/rental');
const { Movie } = require('../../models/movie');
const { User } = require('../../models/user');
const mongoose = require('mongoose');


describe('/api/returns', () => {

    let server;
    let customerId;
    let movieId;
    let rental;
    let movie;
    let token;


    const exec = async() => {
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    }

    beforeEach(async() => {
        server = require('../../app');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthKey();

        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            genre: { name: 'genre1' },
            numberInStock: 10
        });

        await movie.save();

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
        await Movie.remove({});
    });

    it('should return 401 if user is not logged in', async() => {

        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if customer ID is not provided', async() => {

        customerId = '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 400 if movie ID is not provided', async() => {
        movieId = '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 404 if rental not found for customer/movie', async() => {

        await Rental.remove({});

        const res = await exec();

        expect(res.status).toBe(404);
    });

    it('should return 400 if return is already processed', async() => {

        rental.dateReturned = new Date();

        await rental.save();

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if valid request', async() => {

        const res = await exec();

        expect(res.status).toBe(200);
    });

    it('should set the return date if input is valid', async() => {

        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);

        const diff = new Date() - rentalInDb.dateReturned;

        //expect(rentalInDb.dateReturned).toBeDefined();

        expect(diff).toBeLessThan(10 * 1000);

    });

    it('should set the rental fee if input is valid', async() => {

        rental.dateOut = moment().add(-7, 'days').toDate();
        rental.save();

        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);

        expect(rentalInDb.rentalFee).toBe(14);


        // const diff = new Date() - rentalInDb.dateReturned;

        // expect(diff).toBeLessThan(10 * 1000);

    });

    it('should increase the movie stock if input is valid', async() => {

        const res = await exec();

        const movieInDb = await Movie.findById(movieId);

        // expect(movieInDb.numberInStock).toBe(11); // 11 looks magical
        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);

    });

    it('should the rental if input is valid', async() => {

        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);

        // expect(res.body).toMatchObject(rentalInDb); // Too specific cos of json formated res date

        // expect(res.body).toHaveProperty('dateOut');
        // expect(res.body).toHaveProperty('dateReturned');
        // expect(res.body).toHaveProperty('rentalFee');
        // expect(res.body).toHaveProperty('customer');
        // expect(res.body).toHaveProperty('movie');

        expect(Object.keys(res.body))
            .toEqual(expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie']));
    });
});