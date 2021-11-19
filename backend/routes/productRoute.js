const express = require('express')
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route('/products').get(getAllProducts)
router
  .route('/admin/products/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct)
router.route('/products/:id').get(getProduct)
router
  .route('/admin/products/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
router
  .route('/admin/products/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
module.exports = router
