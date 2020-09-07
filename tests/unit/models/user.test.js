const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthKey', () => {
    it('should return a valid jwt', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        const user = new User(payload);
        const token = user.generateAuthKey();
        const verifyToken = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(verifyToken).toMatchObject(payload);
    })
})