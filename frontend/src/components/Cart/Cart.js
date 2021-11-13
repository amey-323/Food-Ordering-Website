import { React } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard.js'

const Cart = () => {
  return (
    <>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
      </div>
    </>
  )
}
export default Cart
