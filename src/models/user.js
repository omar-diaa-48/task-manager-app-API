const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type:String,
        required:true,
        minLength:7,
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Cant user this word as a password')
            }
        }
    },
    age : {
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('age must be a positive number')
            }
        }
    },
    tokens :[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('Email not found! Unable to login')

    const isMatched = await bcrypt.compare(password, user.password)
    if(!isMatched) throw new Error('Password is wrong! Unable to login')

    return user
}

userSchema.methods.generateAuthToken = function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.SECRET,{expiresIn:'30 minutes'})
    return token 
}

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User