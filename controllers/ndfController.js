const ndf = require('./ndf/lib.js');
bodyParser = require('body-parser').json();

module.exports = function (app) {

    app.post('/create', bodyParser, ndf.create)
    app.get('/getById/:id', bodyParser, ndf.getById)
    app.delete('/deleteById/:id', bodyParser, ndf.deleteById)
    app.get('/getAll', bodyParser, ndf.getAll)
    app.post('/search', ndf.get) // C'est moche mais ça permet de passer les params de la recherche dans le body de la requête...
                                 // TODO : parse the url string to get the params and do it with a normal get request
    app.put('/put/:id', bodyParser, ndf.put)
    app.get('/getNdfOfUser/:id', ndf.getNdfsOfUser)

    
}