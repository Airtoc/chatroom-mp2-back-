const mongoose = require('mongoose');

//se define el esquema de un mensaje para mongoDB Atlas
const messageSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    user_id: {
        type: String, 
        required: true
    },
    text: {
        type: String, 
        required: true
    },
    room_id: {
        type: String, 
        required: true
    },

}, { timestamps:true })

const Message = mongoose.model('message', messageSchema);
module.exports = Message;