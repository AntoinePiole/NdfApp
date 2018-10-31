const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const config = require('../config/config');

var Schema = mongoose.Schema;

var ndfSchema = mongoose.Schema({
    id :{ 
        type : Number,
        required : false
    },    
    userid :{ 
        type : Schema.Types.ObjectId,
        required : true
    },    
    date :{ 
        type : Date,
        required : true
    },    
    title :{ 
        type : String,
        required : true
    },    
    amount :{ 
        type : Number,
        required : true
    },    
    currency :{ 
        type : String,
        required : true
    },    
    comment :{ 
        type : String,
        required : true
    }
},{ timestamps: { createdAt: 'created_at' }})


ndfSchema.methods = {
    getToken: function () {
		return jwt.encode(this, config.secret);
	}
}

module.exports = mongoose.model('Ndf', ndfSchema);