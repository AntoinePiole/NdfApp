

let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
let mongoose = require('mongoose');

Grid.mongo = mongoose.mongo;
let conn = mongoose.connection;
let gfs = Grid(conn.db);

// Setting up the storage element
let storage = GridFsStorage({
    gfs : gfs,

    filename: (req, file, cb) => {
        let date = Date.now();
        // The way you want to store your file in database
        cb(null, file.fieldname + '-' + date + '.'); 
    },
    
    // Additional Meta-data that you want to store
    metadata: function(req, file, cb) {
        cb(null, { originalname: file.originalname });
    },
    root: 'ctFiles' // Root collection name
});

// Multer configuration for single file uploads
let upload = multer({
    storage: storage
}).single('file');
  
  // express route where we receive files from the client
  // passing multer middleware
function uploadFile(req, res) {
    upload.single('file')
   const file = req.file; // file passed from client
   const meta = req.body; // all other values passed from the client, like name, etc..
   
   // send the data to our REST API
   axios({
      url: `https://api.myrest.com/uploads`,
      method: 'post',
      data: {
        file,
        name: meta.name,      
      },
    })
     .then(response => res.status(200).json(response.data.data))
     .catch((error) => res.status(500).json(error.response.data));
  };

function get(req, res) {
    gfs.collection('ctFiles'); //set collection name to lookup into
    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // create read stream
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "ctFiles"
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType)
        // Return response
        return readstream.pipe(res);
    });
};

function getAll(req, res) {
    let filesData = [];
    let count = 0;
    gfs.collection('ctFiles'); // set the collection to look up into

    gfs.files.find({}).toArray((err, files) => {
        // Error checking
        if(!files || files.length === 0){
            return res.status(404).json({
                "text": "error"
            });
        }
        // Loop through all the files and fetch the necessary information
        files.forEach((file) => {
            filesData[count++] = {
                originalname: file.metadata.originalname,
                filename: file.filename,
                contentType: file.contentType
            }
        });
        res.json(filesData);
    });
};

function uploadFile(req, res) {
    upload(req,res, (err) => {
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        res.json({error_code:0, error_desc: null, file_uploaded: true});
    });
};

exports.uploadFile=uploadFile;
exports.getAll=getAll;
exports.get=get;