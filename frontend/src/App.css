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
function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });
  },[]);
  return (
    <Router>
      <Header/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/products" component={Products}/>
      <Route exact path="/Search" component={Search}/>
      <Route exact path="/products/:keyword" component={Products}/>
      <Route exact path="/login" component={LoginSignUp}/>
      <Footer/>
    </Router>
  )
  
}

export default App;