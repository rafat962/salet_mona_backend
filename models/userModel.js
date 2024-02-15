const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'you should enter your name']
    },
    email:{
        type:String,
        require:[true,'you should enter your email'],
        unique:true,
        validate:{
            validator:validator.isEmail,
            message: 'Please enter a valid email address'
        }
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        require: [true, 'you should enter your password'],
        select:false,
        minlength:2
    },
    confirmPassword:{
        type:String,
        require:[true,'you should enter your Confirmpassword'],
        validate:{ 
            validator:function(v){
                return v === this.password
            },
            message:'Password and Confirm Password do not match'
        }
    },
    address: {
        street: String,
        city: String,
        state: String,
    },
    phoneNumber: {
        type: String,
    },
    extraDescount:{
        type:Number
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0], // Default coordinates (longitude, latitude)
        },
    },
    lovelist:[{
        type: mongoose.Schema.ObjectId,
        ref:'Products'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken :String,
    resetPasswordExpires:Date
})





// -------------- encrupt password
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined
    next()
})

// -------------- compare password
UserSchema.methods.correctPasswordCompare = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};




const User = mongoose.model('User',UserSchema)


module.exports = User

