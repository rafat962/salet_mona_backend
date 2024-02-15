const express = require('express')
const bookingController = require('../controllers/BookingControllers')
const auth = require('../controllers/authControllers')


const Routing = express.Router()



//----------------- CRUD Routs -----------------
Routing.use(auth.protect)
Routing.route('/').get(bookingController.getAllBooking).post(bookingController.createNewBooking)
Routing.route('/:id').get(bookingController.getOneBooking).delete(bookingController.deleteBooking).patch(bookingController.updateBooking)

module.exports = Routing 
