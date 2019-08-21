const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import Routes
const authRoute = require('./routes/auth')

dotenv.config();

//COnnect to database
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },()=> console.log("COnencted"))

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user',authRoute);



app.listen(3000,()=> console.log(`Running on ${3000}`))