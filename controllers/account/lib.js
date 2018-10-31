const User = require('../../schema/userSchema.js');
const GestionUser = require('../../schema/GestionUser.js');
const BasicUser = require('../../schema/BasicUser.js');
const AdminUser = require('../../schema/AdminUser.js');
const passwordHash = require("password-hash");

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new BasicUser(user);
            console.log(_u);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken(),
                        "userid": _u._id
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
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

function login(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": user.getToken(),
                        "userid": user._id,
                        "rank": user.__t,
                        "text": "Authentification réussie"
                    })
                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
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
        var user = {
            password : req.body.password,
            email : req.body.email,
            rank : req.body.rank
        }
    
    var query = User.replaceOne({_id:_id}, user);
    query.exec(function(err, user){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        res.json(
            user
        )
    })
    }
}


function setRank(req, res) {
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
        var rank = req.body.rank;
    var query = User.findOne({_id:_id});
    query.exec(function(err, user){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {
        var _u = {
            password : user.password,
            email : user.email,
            users : []
        }
        var user=new GestionUser(_u);
        _u._id=user._id;        
        query.exec(function(err, user){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        res.json(
            user
        )
    })
    }
    })
    }
}

function setGestion(req, res) {
    try {
        _id = req.params.id
    } catch (err) {
        res.status(500).json({
            "text": "Invalid Request"
        })
    }
    var query = User.findOneAndDelete({_id:_id});
    query.exec(function(err, user){    
        
        if(!user) {
            res.status(400).json({
                "text": "Could not find user"
            })
        }
        else {
        console.log(user);
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {
            var _u = {
                password : user.password,
                email : user.email,
                users : []
            }
            var _u = new GestionUser(_u);
            _u._id=user._id;
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } 
                else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken(),
                        "userid": _u._id,
                        "rank":_u.__t
                    })
                }
            })
        }
    }
    })
}




function setBasic(req, res) { 
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
        var query = User.findOneAndDelete({_id:_id});
        query.exec(function(err, user){
            
        if(!user) {
            res.status(400).json({
                "text": "Could not find user"
            })
        }
        else {
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {
            var _u = {
                password : user.password, 
                email : user.email,
                gestionId :req.body.gestionId
            }
            var _u = new BasicUser(_u);
            _u._id=user._id;
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } 
                else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken(),
                        "userid": _u._id,
                        "rank":_u.__t,
                        "gestionId":_u.gestionId
                    })
                }
            })
        }
        }
        })
    }
}

function setAdmin(req, res) {
    try {
        _id = req.params.id
    } catch (err) {
        res.status(500).json({
            "text": "Invalid Request"
        })
    }
    var query = User.findOneAndDelete({_id:_id});
    query.exec(function(err, user){    
        
        if(!user) {
            res.status(400).json({
                "text": "Could not find user"
            })
        }
        else {
        console.log(user);
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {
            var _u = {
                password : user.password,
                email : user.email
            }
            var _u = new AdminUser(_u);
            _u._id=user._id;
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } 
                else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": _u.getToken(),
                        "userid": _u._id,
                        "rank":_u.__t
                    })
                }
            })
        }
    }
    })
}

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;
exports.put = put;
exports.setGestion = setGestion;
exports.setBasic = setBasic;
exports.setAdmin = setAdmin;