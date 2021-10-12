const mongoose = require('mongoose');

// Se define el esquema del modelo 'Sala {Room}' para enviar al cluster de: MongoDB Atlas.
const roomSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }

})

const Room = mongoose.model('room', roomSchema)
module.exports = Room;