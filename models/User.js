const mongoose = require('mongoose');

//se define el esquema de un usuario para mongoDB Atlas
const roomSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true,
        minlength: 6
    },
})

const User = mongoose.model('user', roomSchema)
module.exports = User;