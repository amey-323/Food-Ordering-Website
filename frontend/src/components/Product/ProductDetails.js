import { React, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails,newReview, clearErrors } from '../../actions/productAction'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { loading, error, product } = useSelector(
    (state) => state.productDetails,
  )
  const {success,error:reviewError}=useSelector((state)=>state.newReview);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const increaseQty = () => {
    if (product.Stock === "Not Available") return
    const qty = quantity + 1
    setQuantity(qty)
  }
  const decreaseQty = () => {
    if (quantity <= 1) return
    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity))
    alert.success('Item added to cart')
  }
  const submitReviewToggle=()=>{
      open?setOpen(false):setOpen(true);
  }
  const reviewSubmitHandler=()=>{
      const myForm=new FormData();
      myForm.set("rating",rating);
      myForm.set("comment",comment);
      myForm.set("productId",match.params.id);
      dispatch(newReview(myForm));
      setOpen(false)
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("Review Submitted Successfully");
      dispatch({type:NEW_REVIEW_RESET});
    }
    dispatch(getProductDetails(match.params.id))
  }, [dispatch, match.params.id, alert, error,success,reviewError])
  const options = {
    size: "large",
    value: product.rating,
    readOnly:true,
    precision:0.5
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- FoodApp`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => {
                    return (
                      <img
                        // style={{height:'20rem',width:'60rem'}}
                        src={item.url}
                        className="CarouselImage"
                        key={item.url}
                        alt={`${i} slide`}
                      />
                    )
                  })}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className='deatilsBlock-2-span'>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h2>{`Rs${product.price}`}</h2>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQty}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQty}>+</button>
                  </div>
                  <button
                    disabled={product.Stock ==="Not Available" ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock ==="Not Available"? 'redColor' : 'greenColor'}>
                    {product.Stock ==="Not Available"? 'Not Avaliable' : 'Available'}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description:<p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}    
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  )
}

export default ProductDetails
