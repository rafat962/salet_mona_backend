const mongoose = require('mongoose');
const Products = require('./productsModel');
const User = require('./userModel')
const bookingSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Products',
            required: [true, 'Empty cart!']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity must be specified for each product.']
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price.']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});



bookingSchema.pre(/^find/, function(next) {
    this.populate('user').populate('products.product');
    next();
});

bookingSchema.pre('save', async function(next){
    this.products.forEach(async element => {
        const product =  await Products.findById(element.product._id)
        if(product){
            product.purchaseCount+=element.quantity
            await product.save() 
        }
    });
    next()
})
bookingSchema.pre('save', async function(next) {
    // Ensure each booking has a user associated with it
    if (!this.user) {
        throw new Error('Booking must belong to a User!');
    }

    // Update the corresponding user's orders field with the booking ID
    try {
        const user = await User.findById(this.user);
        if (!user) {
            throw new Error('User not found!');
        }
        user.orders.push(this._id);
        await user.save();
    } catch (err) {
        console.error('Error updating user orders:', err);
        throw new Error('Failed to update user orders!');
    }

    // Other existing middleware logic...
    
    next();
});



const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
