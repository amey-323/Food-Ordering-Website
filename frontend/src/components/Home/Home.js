import {React,useEffect} from 'react';
import './Home.css';
import {CgMouse} from 'react-icons/all';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { getProduct,clearErrors } from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import {useAlert} from 'react-alert';
// const product={
//     name:"Sandwich",
//     images:[{url:"http://cdn.cnn.com/cnnnext/dam/assets/140430115517-06-comfort-foods.jpg"}],
//     price:"3000",
//     _id:"Kunal"
// };
const Home = () => {
    const dispatch=useDispatch();
    const {loading,error,products}=useSelector((state)=>state.products);
    const alert=useAlert();
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch,error,alert]);
    return (
        <>
            {loading?<Loader/>:
                (
                    <>
                        <MetaData title="FoodApp"/>
                        <div className='banner'>
                            <p>Welcome to FoodApp</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>
                            <a href="#container">
                                <button>
                                    Scroll <CgMouse/>
                                </button>
                            </a>
                        </div>
                        <h2 className='homeHeading'>Featured Products</h2>
                        <div className='container' id='container'>
                            {console.log(products)}
                            {products && products.map((product)=><ProductCard product={product}/>)}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Home;
