const mongoose = require('mongoose');
const User = require('./userSchema');

var AdminUser = User.discriminator('AdminUser',
new mongoose.Schema({}, {discriminatorKey: 'kind'}));

module.exports = AdminUser;