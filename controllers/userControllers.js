const User = require('../models/userModel')
const ApiFactory = require('../utils/apiFactory')

//------------------------- CRUD operations -------------------------
//------------------- Get All User -------------------

exports.getAllUsers = ApiFactory.getAll(User)

//------------------- Get one User -------------------
exports.getOneUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id).populate('lovelist')
        res.status(200).json({
            statu:'success_one',
            data:user
        })
    }catch(err){
        res.status(400).json({
            statu:'fail',
            data:err.message
        })
    }
}

//------------------- Create User -------------------

exports.createNewUser = ApiFactory.createNew(User)

//------------------- Delete User -------------------

exports.deleteUser = ApiFactory.delete(User)

//------------------- Update User -------------------

exports.updateUser = ApiFactory.update(User)
//----------------------------------------------------------------------------------------------------

//------------------- Get Me -------------------
exports.getme = async (req,res,next) =>{
    try{
        const me = await req.user.populate('lovelist')
        res.status(200).json({
            status:'success_user',
            user:me
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.getmeorders = async (req,res,next) =>{
    try{
        const me = await req.user.populate('orders')
        res.status(200).json({
            status:'success_user',
            user:me
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}





