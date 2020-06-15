let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userAccountSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type:String,
        required: true
    }
});

//Register the schema with mongoose
let userAccountModel = mongoose.model('userAccountModel', userAccountSchema);