const Product = require('../models/productsModel')
const apifeature = require('../utils/apiFeature')
const User = require('../models/userModel')

//------------------------- CRUD operations -------------------------
//------------------- Get All Tours -------------------

exports.getAllTours = async(req,res,next)=>{
    try{
        const product =  new apifeature(Product,req.query).filter().field().sort().paginate()
        const document = await product.tour
        res.status(200).json({
            statu:'success',
            documentNum:document.length,
            document
        })
    }catch(err){
        res.status(404).json({
            statu:'fail',
            message:err.message
        })
    }
}

//------------------- Get one Tour -------------------


exports.getOneTour = async (req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id)
        product.numSearch+=1
        product.save()
        res.status(200).json({
            statu:'success',
            product
        })
    }catch(err){
        res.status(404).json({
            statu:'fail',
            message:err.message
        })
    }
}



//------------------- Delete Tour -------------------

exports.deleteTour = async (req,res,next)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            statu:'success',
            product
        })
    }catch(err){
        res.status(404).json({
            statu:'fail',
            message:err.message
        })
    }
}
//------------------- Create Tour -------------------

exports.createNewTour = async (req,res,next)=>{
    try{
        const product = await Product.create(req.body)
        if(req.files){
            if(req.files.main_img[0]){
                product.main_img = req.files.main_img[0].filename
            }
            if (req.files.sub_img) {
                // Assuming sub_img is an array field in your schema
                product.sub_img =req.files.sub_img.map(file=>file.filename)
                
            }
        }
        await product.save()
        res.status(200).json({
            statu:'success',
            product
        })
    }catch(err){
        res.status(404).json({
            statu:'failll',
            message:err.message
        })
    }
}
//------------------- Update Tour -------------------
exports.updateTour = async (req,res,next)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(req.files){
            if(req.files.main_img){
                if(req.files.main_img[0]){
                    product.main_img = req.files?.main_img[0].filename
                }
            }
            if (req.files.sub_img) {
                // Assuming sub_img is an array field in your schema
                product.sub_img =req.files.sub_img.map(file=>file.filename)
            }
        }
        await product.save()
        res.status(200).json({
            statu:'success',
            product
        })
    }catch(err){
        res.status(404).json({
            statu:'faillll',
            message:err.message
        })
    }
}
//----------------------------------------------------------------------------------------------------



//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//------------------------- Addtional operations -------------------------

//------------------- top5 Price -------------------
exports.top5 = (req,res,next)=>{
    req.query.sort = '-price'
    req.query.limit = 5
    next()
}

//------------------- LIKE -------------------

exports.like = async (req, res, next) => {
    try{
        const userID = req.user._id
        const ProductID = req.params.id
        const user = await User.findByIdAndUpdate(userID,{$addToSet:{lovelist:ProductID}},{new:true})
        await Product.findByIdAndUpdate(ProductID,{$addToSet:{lovers:userID}},{new:true})
        res.status(200).json({
            statu:'success',
            leng:user.lovelist.length
        })
    }catch(err){
        res.status(401).json({
            statu:'fail',
            message:err.message
        })
    }
}

//------------------- unLIKE -------------------
exports.unlike = async (req, res, next) => {
    try {
        const userID = req.user._id;
        const productID = req.params.id;
        const user = await User.findByIdAndUpdate(
            userID,
            { $pull: { lovelist: productID } }, // Remove the productID from lovelist
            { new: true }
        );
        await Product.findByIdAndUpdate(
            productID,
            { $pull: { lovers: userID } }, // Remove the userID from lovers
            { new: true }
        );
        res.status(200).json({
            status: 'success',
            length: user.lovelist.length // Return the length of the updated lovelist
        });
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err.message
        });
    }
};







// exports.like = async (req, res, next) => {
//     try {
//         const productId = req.params.id;
//         const action = req.body.action; // 'like' or 'dislike'
//         // Check if the action is valid
//         if (!['like', 'dislike'].includes(action)) {
//             return res.status(400).json({ status: 'error', message: 'Invalid action' });
//         }
//         // Find the product by ID
//         const product = await Product.findById(productId);
//         // Check if the product exists
//         if (!product) {
//             return res.status(404).json({ status: 'error', message: 'Product not found' });
//         }
//         // Update likes based on the action
//         if (action === 'like') {
//             product.likes += 1;
//         } else if (action === 'dislike') {
//             product.likes -= 1;
//         }
//         // Save the updated product
//         await product.save();
//         res.status(200).json({
//             status: 'success',
//             likes: product.likes,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//     }
// };




