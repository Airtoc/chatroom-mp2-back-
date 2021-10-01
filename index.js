const app = require('express')();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const socketio = require('socket.io');
const { callbackify } = require('util');
const io = socketio(http);
const mongoDB = "mongodb+srv://chatdoveadmin:dovepass29092021@cluster0.cvjsi.mongodb.net/chat-database?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch(err => console.log(err))
const {addUser, getUser, removeUser} = require('./helper');
const PORT = process.env.PORT || 5000
const Room = require('./models/Room');
const Message = require('./models/Message')

io.on('connection', (socket) => {
    console.log(socket.id);

    Room.find().then(result =>{
        console.log('output-rooms', result)
        socket.emit('output-rooms', result)
    })
    
    socket.on('create-room', name => {
        //console.log('Sala: ', name)
        const room = new Room({ name });
        room.save().then(result =>{
            io.emit('room-created', result)
        })
    })
    socket.on('join', ({ name, room_id, user_id }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        })
        socket.join(room_id);
        if (error) {
            console.log('Error de ingreso', error)
        } else {
            console.log('Ingreso', user)
        }
    })
    socket.on('sendMessage', (message, room_id, callback)=>{
        const user = getUser(socket.id);
        const msgToStore = {
            name:user.name,
            user_id:user.user_id,
            room_id,
            text:message
        }
        console.log('message', msgToStore)
        const msg = new Message(msgToStore);
        msg.save().then(result=>{
            io.to(room_id).emit('message', result)
            callback()
        })
        
    })
    socket.on('get-messages-history', room_id => {
        Message.find({ room_id }).then(result => {
            socket.emit('output-messages', result)
        })
    })
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);
    })
});

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});