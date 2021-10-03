const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

//se define el esquema de un usuario para mongoDB Atlas
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Por favor ingrese un nombre.']
    }, 
    email: {
        type: String, 
        required: [true, 'Por favor ingrese un correo electrónico.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Por favor ingrese un correo electrónico válido.']
    },
    password: {
        type: String, 
        required: [true,'Por favor ingrese una contraseña válida.'],
        minlength: [6, 'La contraseña debe tener almenos 6 caracteres.']
    },
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (isAuthenticated) {
            return user;
        }
        throw Error('incorrect pwd');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema)
module.exports = User;