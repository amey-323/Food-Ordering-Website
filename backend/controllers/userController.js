const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken=require('../utils/jwtToken');
const sendMail=require('../utils/sendMail');
const crypto=require('crypto');
const cloudinary=require("cloudinary");
// User registration
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    });
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });
    sendToken(user,201,res);
});

//User login
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    // Checking is user has given email and password
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400));
    }

    const user=await User.findOne({email:email}).select("+password");
   
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,200,res);

});

// User Logout
exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
});


//Forgot Password
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User Not Found",404));
    }
    // Get Reset Password Token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message=`Your Password reset token is :- \n\n ${resetPasswordUrl}\n\nIf you have not requested for this email then, please ignore it.`;

    try{
        await sendMail({
            user:user.email,
            subject:`Ecommerce Password recovery`,
            message
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        });
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));   
    }
})

// Reset Password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');


    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now()}
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired"),400);
    };
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password does not match"),400);
    };
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
});

// Get User Details
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    // console.log(req.user.id);
    res.status(200).json({
        success:true,
        user,
    });
})

//Update User Password
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('+password');

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new Errorhandler("Old Password is Incorrect",400));
    };
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("New Password and Confirm Password does not match"));
    };
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
})

//Update User Profile
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };

    if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);
        const imageId=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });
        newUserData.avatar={
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }

    }

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    await user.save();
    res.status(200).json({
        success:true
    });
})

//Get All Users -- Admin
exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    });
})

//Get Single User -- Admin
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User with Id:${req.params.id} does not exist`,400));
    }
    res.status(200).json({
        success:true,
        user
    });
});

// Update User Role -- Admin
exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    };
    await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        validators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        message:"Role Updated Successfully"
    })
})

// Delete Specific User -- Admin
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with Id:${req.params.id} does not exist`,400));
    }
    
    const imageId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
})