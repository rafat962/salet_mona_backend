const Booking = require('../models/bookingModel')
const ApiFactory = require('../utils/apiFactory')



//------------------------- CRUD operations -------------------------
//------------------- Get All Booking -------------------

exports.getAllBooking = async (req,res,next)=>{
    try{
        const bookings = await Booking.find().populate('user')
        res.status(200).json({
            status:'success',
            total:bookings.length,
            bookings
        })
    }catch(err){
        res.status(400).json({
            status:'get booking fail',
            message:err.message
        })
    }
}

//------------------- Get one Booking -------------------

exports.getOneBooking = ApiFactory.getOne(Booking)

//------------------- Create Booking -------------------

exports.createNewBooking = async (req, res, next) => {
    try {
        const bookingData = req.body;
        bookingData.user = req.user._id
        const book = await Booking.create(bookingData);
        res.status(201).json({ 
            status: 'success',
            message: 'Booking created successfully',
            data: {
                booking: book
            }
        });
    } catch (err) {
        res.status(400).json({ // Use status 400 for client errors
            status: 'fail',
            message: err.message
        });
    }
};

//------------------- Delete Booking -------------------

exports.deleteBooking = ApiFactory.delete(Booking)

//------------------- Update Booking -------------------

exports.updateBooking = ApiFactory.update(Booking)
//----------------------------------------------------------------------------------------------------
