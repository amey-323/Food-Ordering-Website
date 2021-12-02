import {React,useEffect,useState} from 'react';
import './Products.css';
import { useDispatch,useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { getProduct,clearErrors } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography';
const categories=["Burger","Pizza","Biryani","Chinese","South Indian","North Indian","Cake & Desserts","Ice cream"];
const Products = ({match}) => {
    const dispatch=useDispatch();
    const [currentPage,setCurrentPage]=useState(1);
    const [price,setPrice]=useState([0,25000]);
    const [category,setCategory]=useState("");
    const [rating,setRating]=useState(0);

    const {loading,error,products,resultPerPage,filteredProductsCount}=useSelector((state)=>state.products);
    const alert=useAlert();


    const keyword=match.params.keyword;

    
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e);
    };
    const priceHandler=(event,newPrice)=>{
        setPrice(newPrice);
    }
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword,currentPage,price,category,rating,alert,error));
    }, [dispatch,keyword,currentPage,price,category,rating,alert,error]);

    // let count=filteredProductsCount;
    return (
        <>
            {loading?(<Loader/>):(
                <>
                    <MetaData title={`Food Products`}/>
                    <h2 className='productsHeading'>Food Products</h2>
                    <div className='products'>
                        {products && products.map((product)=>{
                            return <ProductCard product={product}/>
                        })}
                    </div>
                    <div className='filterBox'>
                        <Typography className='typo'>Price</Typography>
                        <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul className='category-box'>
                            {categories.map((category)=>{
                                return <li
                                className='category-link'
                                key={category}
                                onClick={()=>setCategory(category)}
                                >{category}
                                </li>
                            })}
                        </ul>
                        <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider value={rating}
                        onChange={(e,newRating)=>{setRating(newRating)}}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay='auto'
                        min={0}
                        max={5}
                        />
                        </fieldset>
                        
                    </div>
                    
                    {filteredProductsCount>resultPerPage&&
                    (<div className='paginationBox'>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={filteredProductsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />  
                    </div>)
                    }
                    
                </>
            )}
        </>
    )
}

export default Products;
