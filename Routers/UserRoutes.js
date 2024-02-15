const express = require('express')
const userController = require('../controllers/userControllers')
const auth = require('../controllers/authControllers')


const Routing = express.Router()


//----------------- Auth Routs -----------------
Routing.route('/login').post(auth.login)
Routing.route('/signup').post(auth.signUp)
Routing.route('/resetPassword').post(auth.resetPassword)
Routing.route('/resetPassword2/:token').patch(auth.resetPassword2)
Routing.route('/UpdatePassword').patch(auth.protect,auth.updatePassword)
Routing.route('/getme').get(auth.protect,userController.getme)
Routing.route('/getmeorder').get(auth.protect,userController.getmeorders)



//----------------- CRUD Routs -----------------
Routing.route('/me').get(auth.protect,auth.getMe)
Routing.route('/').get(userController.getAllUsers).post(userController.createNewUser)
Routing.route('/:id').get(userController.getOneUser).delete(userController.deleteUser).patch(userController.updateUser)

module.exports = Routing 
