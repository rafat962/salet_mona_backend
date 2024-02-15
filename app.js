const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const compression = require('compression')
const productsRoutes = require('./Routers/ProductsRoutes')
const UserRoutes = require('./Routers/UserRoutes')
const BookingRoutes = require('./Routers/BookingRoutes')
//--------------------------- configrations --------------------------- 
app.use(express.json())

app.use(express.static(`${__dirname}/public`))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(compression())
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to 'pug'
app.set('view engine', 'pug');
//--------------------------- Routers ---------------------------

app.use('/api/v1/product',productsRoutes)
app.use('/api/v1/user',UserRoutes)
app.use('/api/v1/booking',BookingRoutes)

app.use('/',(req,res,next)=>{ 
    res.render('tesr.pug')
})

app.use('*',(req,res,next)=>{
    res.status(400).json({ 
        status:'faill',
        message:'INVALID URL'
    })
})



module.exports = app
