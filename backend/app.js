const bodyParser = require('body-parser');
const express = require('express');
const cookieParser=require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
// Route Imports
const products = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order=require('./routes/orderRoute');
app.use('/api/v1', products);
app.use('/api/v1', user);
app.use('/api/v1',order);


//Error Middleware
app.use(errorMiddleware);


module.exports = app;