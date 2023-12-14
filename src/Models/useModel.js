const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    userType: {
        type: String,
        enum: ["Usuário", "Moderador", "Administrador"],
        required: true,
    },
})


const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    userSchema
}

