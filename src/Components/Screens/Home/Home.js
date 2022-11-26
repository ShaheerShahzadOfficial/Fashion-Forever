import React, { Fragment, useEffect } from "react";
import "./home.css";
import Product from "./product.js";
import { GetProduct } from "../../Redux/Actions/ProductsActions";
import { useDispatch, useSelector } from "react-redux";
// import { Circles } from 'react-loader-spinner'
import Loader from "../../config/Loader/loader";
import MetaData from "../../../MetaData";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    products
    // productsCount
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(GetProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={"Home "} />
      <div className="banner">
        {/* <Carousel>
                 <img src={slide1} alt="slide1" className="bgImg"/>
                 <img src={slide2} alt="slide2" className="bgImg"/>
               </Carousel> */}
        <h3
          style={{
            fontSize: "3vmax",
            fontFamily: "Poppins,sans-serif",
            color: "#fff",
            backgroundColor: "rgb(255, 0, 76)",
            fontWeight: 900
          }}
        >
          Fashionable Collection Only On{" "}
        </h3>
        <h1>Forever Fashion</h1>

        <div>
          <a href="#container">
            <button
              type="submit"
              style={{
                width: "135px",
                height: "50px",
                border: "none",
                background: "rgb(255, 0, 76)",
                margin: "10px 0",
                fontSize: "1rem",
                color: "#fff",
                cursor: "pointer"
              }}
              className="Home__button"
            >
              SHOP NOW
            </button>
          </a>
        </div>
      </div>

      {/* <div className="banner">
               <Carousel>
                 <img src={"https://mern-ecommerce-stores.herokuapp.com/static/media/background.1a0fd5a07de6b9e3356b.jpg"} alt={"slide1"} className="bgImg"/>
                 <img src={slide1} alt={"slide2"} className="bgImg"/>
                 <img src={slide2} alt={"slide3"} className="bgImg"/>

               </Carousel>
             <div className="home__content">

               <div>
                 <h2 style={{
                   fontSize:"3vmax",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                 }}>Fashionable</h2>
               </div>
               <div>
                 <h2 style={{
                   fontSize:"3vmax",
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                   lineHeight:".7"
                 }}>Collection Only ON </h2>
               </div>

               <div>
                 <h2 style={{
                   fontSize:"5vmax",
                   fontFamily:"Poppins,sans-serif",
                   color:"rgb(255, 0, 76)",
                   lineHeight:".7"

                 }}>Forever</h2>
               </div>

               <div>
                 <h2 style={{
                   fontSize:"5vmax",
                   fontFamily:"Poppins,sans-serif",
                   color:"rgb(255, 0, 76)",
                   lineHeight:".7"

                 }}>Fashion</h2>
               </div>

               <div>
                 <a href="#container">
                 <button type="submit" style={{
                   width:"135px",
                   height:"50px",
                   border:"none",
                   background:"#3BB77E",
                   margin:"10px 0",
                   fontSize:"1rem",
                   color:"#fff",
                   cursor:"pointer"
                 }}
                 className="Home__button"
                 >SHOP NOW</button>
                 </a>
               </div>
             </div>
         </div> */}

      <h1 className="homeHeading">Featured Products</h1>

      <div className="container" id="container">
        {loading ? (
          <Loader />
        ) : (
          products &&
          products?.map((products) => (
            <Product key={products?._id} product={products} />
          ))
        )}
      </div>
      <div className="Explore">
        <Link to="/products">
          <button
            style={{
              fontSize: "1.4rem"
            }}
          >
            Explore More
          </button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Home;
