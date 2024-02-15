const mongoose = require('mongoose')



const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
        // required:[true,'you should enter Product Name']
    },
    price:{
        type:Number,
        //required:[true,'you should enter Product Number']
    },
    size:{
        type:String,
        //required:[true,'you should enter Product size']
    },
    main_img:String,
    sub_img: [String],
    ingredients:{
        type:String
    },
    category: {
        type: String,
        //required: [true, 'you should enter Product category']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    numSearch:{
        type:Number,
        default:0
    },
    purchaseCount: {
        type: Number,
    },
    discount: {
        type: Number,
        default: 0,
    },  
    finalPrice: {
        type: Number,
        default: 0,
    },
    lovers:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    code:String
})



// ------------------------ Date
ProductsSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    this.finalPrice = this.price - this.discount
    next();
});
// ------------------------ searchNum
// ProductsSchema.post('findOne',async function(doc){
//     if (doc) {
//         doc.numSearch += 1;
//         await doc.save();
//     }
// })


// ------------------------ like






// export
const Products = mongoose.model('Products',ProductsSchema)
module.exports = Products