const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [8, 'Password can exceed minimum 8 charecters'],
        maxlength: [12, 'password cannot exceed 12 characters'],
        select : false
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this.id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.isValidPassword = async function(userpassword){
    return await bcrypt.compare(userpassword, this.password);
}

let model = mongoose.model('User', userSchema);

module.exports = model;