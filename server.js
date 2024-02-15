const mongoose = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})


mongoose.connect(process.env.DB).then(() => console.log('DB connection successfully'));



app.listen(process.env.PORT,'127.0.0.1',()=>{
    console.log(`app is lestning on Host ${process.env.PORT}`)
})





