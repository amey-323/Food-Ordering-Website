//order control
const Order=require("../models/orderModel");
const Product=require("../models/productModel");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");

const ErrorHandler = require("../utils/errorhandler");

//Create new Order
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const {
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        shippingInfo,
        orderItems,
        paymentInfo,
        
    }=req.body;
    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });
    res.status(201).json({
        success:true,
        order
    });
});

//get Single Order
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }
    res.status(200).json({
        success:true,
        order,
    });
});

//get logged in user orders
exports.myOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        orders,
    });
});

// get all orders -- admin
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find();

    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    });
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    });
});

// update Order status -- Admin
exports.updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler('Order not found with this Id'),404);
    }
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("This order has already been delivered",400));
    }
    // if(req.body.status==="Shipped"){
    //     order.orderItems.forEach(async orderProduct=>{
    //         await updateStock(orderProduct.product,orderProduct.quantity);
    //     });
    // }

    order.orderStatus=req.body.status;
    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })
});
// async function updateStock(productId,qty){
//     const product=await Product.findById({_id:productId});
//     product.Stock-=qty;
//     await product.save({validateBeforeSave:false});
// }
// delete Order -- Admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }
    await order.remove();
    res.status(200).json({
        success:true,
    });
})