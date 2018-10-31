const mongoose = require('mongoose');
const User = require('./userSchema');


var GestionUser = User.discriminator('GestionUser',
    new mongoose.Schema({users: [Number]}, {discriminatorKey: 'kind'}));

module.exports = GestionUser;