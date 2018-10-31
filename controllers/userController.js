const account = require('./account/lib.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.put('/put/:id', account.put);
    app.get('/setGestion/:id', account.setGestion);
    app.post('/setBasic/:id', account.setBasic);
    app.get('/setAdmin/:id', account.setAdmin)
}