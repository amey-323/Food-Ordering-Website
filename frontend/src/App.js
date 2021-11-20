import './App.css'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Header from './components/layout/Header/Header.js'
import Home from './components/Home/Home.js'
import Footer from './components/layout/Footer/Footer.js'
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products'
import Search from './components/Product/Search.js'
import WebFont from 'webfontloader' //used to get the required font
import React from 'react'
import LoginSignUp from './components/User/LoginSignUp'
import store from './store'
import { loadUser } from './actions/userAction'
import UserOptions from './components/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Profile from './components/User/Profile'
import ProtectedRoute from './components/Route/ProtectedRoute'
import UpdateProfile from './components/User/UpdateProfile.js'
import UpdatePassword from './components/User/UpdatePassword.js'
import ForgotPassword from './components/User/ForgotPassword.js'
import ResetPassword from './components/User/ResetPassword.js'
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
import Payment from './components/Cart/Payment.js';
import OrderSuccess from './components/Cart/OrderSuccess.js';
import MyOrders from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails.js';
import Dashboard from './components/Admin/Dashboard.js';
import ProductList from './components/Admin/ProductList.js';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct.js';
import OrderList from './components/Admin/OrderList.js';
import ProcessOrder from './components/Admin/ProcessOrder.js';
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [stripeApiKey, setStripeApiKey] = useState('')
  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey')
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    })
    store.dispatch(loadUser())
    getStripeApiKey()
  }, [])
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/Search" component={Search} />
      <Route exact path="/products/:keyword" component={Products} />
      <Route exact path="/login" component={LoginSignUp} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <ProtectedRoute exact path="/success" component={OrderSuccess}/>
      <ProtectedRoute exact path="/orders" component={MyOrders}/>
      <Switch>
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>
      </Switch>
      <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>
      <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList}/>
      <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct}/>
      <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct}/>
      <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>
      <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>

      <Footer />
    </Router>
  )
}

export default App
