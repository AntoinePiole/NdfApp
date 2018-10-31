const upload = require('./upload/lib.js');

module.exports = function (app) {
    app.get('/file/:filename', upload.get);
    app.get('/files', upload.getAll);
    app.post('/files', upload.uploadFile('file'))
}