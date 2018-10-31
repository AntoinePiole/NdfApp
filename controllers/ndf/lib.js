const Ndf = require('../../schema/ndfSchema.js');
const User = require('../../schema/userSchema.js');
// const passwordHash = require("password-hash");

function create(req, res) {
    //console.log("I'm tryong to create a ndf")
    if (!req.body) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var ndf = {
            userid : req.body.userid,
            date : req.body.date ? Date(req.body.date) : new Date(),
            title : req.body.title,
            amount : Number(req.body.amount),
            currency : req.body.currency,
            comment : req.body.comment,
        }
        
        var findNdf = new Promise(function (resolve, reject) {resolve(true)})

        findNdf.then(function () {
            var _u = new Ndf(ndf);
            _u.save(function (err, ndf) {
                if (err) {
                    res.status(500).json({
                        "text": err
                    })
                } else {
                    console.log("Nouvelle note de frais : ", ndf)
                    res.status(200).json({
                        "text": "Succès",
                        "token": ndf.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne 2"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'id de ndf existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

function deleteById(req, res) {
    try {
        _id = req.params.id
    } catch (err) {
        res.status(500).json({
            "text": "id not found"
        })
    }
    var query = Ndf.deleteOne({_id:_id});
    query.exec(function(err, ndf){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        res.status(200).json({
            "text": "Successfully removed"
        })
    })
}

function getById(req, res) {
    try {
        _id = req.params.id
    } catch (err) {
        res.status(500).json({
            "text": "invalid request"
        })
    }
    var query = Ndf.findOne({_id:_id});
    
    query.exec(function(err, ndf){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {
        res.status(200).json({
            ndf
        })
        }
    })
}

function getAll(req, res) {
    var query = Ndf.find();
    query.exec(function(err, ndfs){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        res.json(
            ndfs
        )
    })
}

function get(req, res) {
    var query = Ndf.find(req.body);
    query.exec(function(err, ndfs){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        res.json(
            ndfs
        )
    })
}



function getNdfsOfUser(req, res) {
    console.log("hhhh", req.params)
    if (!req.params.id) {
        res.status(400).json({
            "text": "Requête invalide"
        })
    }
    else {

    var query2 = User.findOne({_id:req.params.id});
    query2.exec(function(err, user){
        if(!user) {
            console.log(req.params.id);
            res.status(400).json({
            "text": "No User"
        })
        }
        else {
            if (err) {
                console.log("internalerror");
                res.status(400).json({
                "text": "Requête invalide"
                })
            }
            else {
                console.log("founduser");
                if (user === "error") {
                //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                    res.status(400).json({
                        "text": "Internal Error"
                    })
                }
        
                if (!user) {
                    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                    res.status(400).json({
                        "text": "Gestionnaire non existant"
                    })
                }
                console.log(user);
                var query = Ndf.find({userid : {$in: user._id}});
                query.exec(function(err, ndfs){
                    if (err) {
                        res.status(500).json({
                            "text": "Erreur interne"
                        })
                    }
                    console.log(ndfs);
                    res.status(200).json(
                        ndfs
                    )
                })
            }
        }
    })
    }
}
        function put(req, res) {
            try {
                _id = req.params.id
            } catch (err) {
                res.status(500).json({
                    "text": "Invalid Request"
                })
            }
            
            if (!req.body) {
                //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                res.status(400).json({
                    "text": "Requête invalide"
                })
            } else {
                var ndf = {
                    id : req.body.id,
                    userid : req.body.userid,
                    date : new Date(),
                    title : req.body.title,
                    amount : req.body.amount,
                    currency : req.body.currency,
                    comment : req.body.comment,
                }
            
            var query = Ndf.replaceOne({_id:_id}, ndf);
            query.exec(function(err, ndf){
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                }
                res.json(
                    ndf
                )
            })
            }
        }

    

exports.create = create;
exports.getAll = getAll;
exports.get = get;
exports.getById = getById;
exports.deleteById = deleteById;
exports.put = put;
exports.getNdfsOfUser = getNdfsOfUser;