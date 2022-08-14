import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/all"
import "./home.css"
import Product from "./product.js"
import { GetProduct } from '../../Redux/Actions/ProductsActions'
import { useDispatch, useSelector } from 'react-redux'
// import { Circles } from 'react-loader-spinner'
import Loader from '../../config/Loader/loader'
const Home = () => {

    const dispatch = useDispatch()

    const {
        loading,
        error,
        products,
        productsCount
    } = useSelector(state => state.products)


    useEffect(() => {

        dispatch(GetProduct())


    }, [dispatch, error])





    return (
        <Fragment>
            <div className="banner">
                <h3>Welcome to Ecommerce</h3>
                <h1>
                    Find Amazing Product Here
                </h1>
                <a href='#container'>
                    <button>Scroll <CgMouse /></button>
                </a>
            </div>
            <h1 className="homeHeading">Featured Products</h1>

            <div className="container" id="container">


                {
                    loading ? (
                        <Loader />
                    ) : (
                        products && products?.map(products => (
                            <Product key={products?._id} product={products} />
                        ))
                    )
                }
                {/* {
                    products && products.map(products => (
                        <Product product={products} />
                    ))
                } */}

            </div>

        </Fragment>
    )
}

export default Home