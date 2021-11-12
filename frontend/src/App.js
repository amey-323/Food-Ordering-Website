import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from './components/layout/Header/Header.js';
import Home from './components/Home/Home.js';
import Footer from './components/layout/Footer/Footer.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products';
import Search from './components/Product/Search.js';
import WebFont from 'webfontloader'; //used to get the required font
import React from 'react';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions.js';
import { useSelector} from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
function App() {
  const {isAuthenticated, user}=useSelector((state)=>state.user);
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });
    store.dispatch(loadUser());
  },[]);
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Route exact path="/" component={Home}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/products" component={Products}/>
      <Route exact path="/Search" component={Search}/>
      <Route exact path="/products/:keyword" component={Products}/>
      <Route exact path="/login" component={LoginSignUp}/>
      <ProtectedRoute exact path="/account" component={Profile}/>
      <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
      <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
      <Footer/>
    </Router>
  )
  
}

export default App;
