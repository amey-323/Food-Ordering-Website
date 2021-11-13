import {ADD_TO_CART} from '../constants/cartConstants';
import axios from 'axios';
// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/products/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.productFound._id,
        name: data.productFound.name,
        price: data.productFound.price,
        image: data.productFound.images[0].url,
        stock: data.productFound.Stock,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };