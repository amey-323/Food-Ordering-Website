const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require('cloudinary')

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = []

  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  const imagesLinks = []

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    })

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }

  req.body.images = imagesLinks
  req.body.user = req.user.id
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
})

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8
  const productCount = await Product.countDocuments()
  let filteredProductsCount = await Product.countDocuments()

  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)

  const apifeature1 = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()

  const displayAllProducts = await apifeature.query

  filteredProductsCount = (await apifeature1.query).length;
  // console.log(displayAllProducts);
  // if (displayAllProducts.length == 0) {
  //     return res.status(200).json({
  //         success: false,
  //         message: "No Products Present"
  //     });
  // }
  res.status(200).json({
    success: true,
    displayAllProducts,
    productCount,
    resultPerPage,
    filteredProductsCount,
  })
})

// Get All Products (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find()
  res.status(200).json({
    success: true,
    products,
  })
})

//Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const productDelete = await Product.findById(req.params.id)
  // console.log(productDelete);
  if (!productDelete) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  //Deleting Images from cloudinary
  for(let i=0;i<productDelete.images.length;i++){
    await cloudinary.v2.uploader.destroy(productDelete.images[i].public_id);
  }
  await productDelete.remove()
  res.status(200).json({
    success: true,
    message: 'Product Deleted Successfully',
  })
})

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  var productFound = await Product.findById(req.params.id)
  // console.log(productFound);
  if (!productFound) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

// Images Start Here
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}

if (images !== undefined) {
  // Deleting Images From Cloudinary
  for (let i = 0; i < productFound.images.length; i++) {
    await cloudinary.v2.uploader.destroy(productFound.images[i].public_id);
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
}

  let productUpdated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  )
  res.status(200).json({
    success: true,
    productUpdated,
  })
})

// Get Product
exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  // const apifeature=new ApiFeatures;
  const productFound = await Product.findById(req.params.id)
  // console.log(productDelete);
  if (!productFound) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  res.status(200).json({
    success: true,
    productFound,
  })
})

//Create Product Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  }
  const product = await Product.findById(productId)
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString(),
  )
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        ;(rev.rating = rating), (rev.comment = comment)
      }
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
  let avg = 0
  product.reviews.forEach((rev) => {
    avg += rev.rating
  })
  avg /= product.reviews.length
  product.rating = avg
  await product.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
  })
})

//Get Product Reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
  if (!product) {
    return next(new ErrorHandler('Product Not Found'), 400)
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
})

//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)
  console.log(product)
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 400))
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString(),
  )

  let avg = 0
  reviews.forEach((rev) => {
    avg += rev.rating
  })
  let rating = 0
  if (reviews.length === 0) {
    rating = 0
  } else {
    rating = avg / reviews.length
  }
  const numOfReviews = reviews.length
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews: reviews,
      rating: rating,
      numOfReviews: numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  )

  res.status(200).json({
    success: true,
  })
})
