import {React,useEffect,useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import {useDispatch,useSelector} from 'react-redux';
import { getProductDetails,clearErrors } from '../../actions/productAction';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = ({match}) => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {loading,error,product} = useSelector((state)=>state.productDetails);
    const [quantity, setQuantity] = useState(1);
    const increaseQty=()=>{
        if(product.Stock<=quantity) return;
        const qty=quantity+1;
        setQuantity(qty);
    }
    const decreaseQty=()=>{
        if(quantity<=1) return;
        const qty=quantity-1;
        setQuantity(qty);
    }

    const addToCartHandler=()=>{
        dispatch(addItemsToCart(match.params.id,quantity));
        alert.success("Item added to cart");
    }
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
       dispatch(getProductDetails(match.params.id));
    }, [dispatch,match.params.id,alert,error]);
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?20:25,
        value:product.rating,
        isHalf:true
    };
    return (
        <>
        {loading?<Loader/>:<>
        <MetaData title={`${product.name} -- FoodApp`}/>
            <div className='ProductDetails'>
                <div>
                    <Carousel>
                        {product.images && product.images.map((item,i)=>{
                            return <img 
                            // style={{height:'20rem',width:'60rem'}}
                            src={item.url}
                            className='CarouselImage'
                            key={item.url}
                            alt={`${i} slide`} />
                        })}
                    </Carousel>
                </div>
                <div>
                    <div className='detailsBlock-1'>
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>
                    </div>
                    <div className='detailsBlock-2'>
                        <ReactStars {...options}/>
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className='detailsBlock-3'>
                        <h2>{`Rs${product.price}`}</h2>
                        <div className='detailsBlock-3-1'>
                            <div className='detailsBlock-3-1-1'>
                                <button onClick={decreaseQty}>-</button>
                                <input readOnly type="number" value={quantity}/>
                                <button onClick={increaseQty}>+</button>
                            </div>
                            <button onClick={addToCartHandler}>Add to Cart</button>
                        </div>
                        <p>
                            Status:
                            <b className={product.Stock<1?'redColor':'greenColor'}>
                                {product.Stock<1?"OutOfStock":"InStock"}
                            </b>
                        </p>
                    </div>
                    <div className='detailsBlock-4'>
                        Description:<p>{product.description}</p>
                    </div>
                    <button className='submitReview'>
                        Submit Review
                    </button>
                </div>
            </div>
            <h3 className='reviewsHeading'>Reviews</h3>
            {product.reviews && product.reviews[0]?(
                <div className='reviews'>
                    {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>)}
                </div>
            ):(
                <p className='noReviews'>No Reviews Yet</p>
            )}
        </>}
        </>
    )
}

export default ProductDetails;
