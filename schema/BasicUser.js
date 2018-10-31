const mongoose = require('mongoose');
const User = require('./userSchema');

var BasicUser = User.discriminator('BasicUser',
new mongoose.Schema({    
    gestionId :{ 
        type : Number,
        default:null
    }
}, {discriminatorKey: 'kind'}));

module.exports = BasicUser;