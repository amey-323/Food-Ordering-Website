const ErrorHandler = require('../utils/errorhandler');
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    //Wrong MongoDB ID Error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Mongoose Duplicate Key Error
    if(err.code===11000){
        const message= `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    };

    //Wrong JWT Error
    if(err.name==="JsonWebTokenError"){
        const message= "Json web token is invalid, Try Again";
        err=new ErrorHandler(message,400);
    };
    //Wrong Expire Error
    if(err.name==="TokenExpiredError"){
        const message= "Json web token is expired, Try Again";
        err=new ErrorHandler(message,400);
    };
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}