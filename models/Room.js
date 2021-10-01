const mongoose = require('mongoose');

//se define el esquema de una sala para mongoDB Atlas
const roomSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }

})

const Room = mongoose.model('room', roomSchema)
module.exports = Room;