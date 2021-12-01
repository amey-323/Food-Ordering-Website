const bodyParser = require('body-parser');
const express = require('express');
const cookieParser=require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cookieParser());

//Config
dotenv.config({ path: "./config/config.env" });
// Route Imports
const products = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order=require('./routes/orderRoute');
const payment=require('./routes/paymentRoute');
app.use('/api/v1', products);
app.use('/api/v1', user);
app.use('/api/v1',order);
app.use('/api/v1',payment);
module.exports = app;