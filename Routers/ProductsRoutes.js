const express = require('express')
const productControllers = require('../controllers/productsControllers')
const auth = require('../controllers/authControllers')
const multer = require('multer');


const Routing = express.Router()



//----------------- addtional Routs -----------------
// ------- top5
Routing.route('/top5').get(productControllers.top5,productControllers.getAllTours)
// ------- likes
Routing.route('/like/:id').patch(auth.protect,productControllers.like)
Routing.route('/unlike/:id').patch(auth.protect,productControllers.unlike)




//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//-----------------  Images -----------------


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
    const destinationPath = 'public/images'
    cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `product-${file.originalname}-${Date.now()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
    cb(null, true);
    } else {
    cb(new Error('You can\'t upload this extension'), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter:multerFilter
});
//----------------- CRUD Routs -----------------
Routing.route('/').get(productControllers.getAllTours).post(upload.fields([
    { name: 'main_img', maxCount: 1 },
    { name: 'sub_img', maxCount: 4 }
]), productControllers.createNewTour);
Routing.route('/:id').delete(productControllers.deleteTour).patch(upload.fields([
    { name: 'main_img', maxCount: 1 },
    { name: 'sub_img', maxCount: 4 }
]),productControllers.updateTour).get(productControllers.getOneTour)






module.exports = Routing