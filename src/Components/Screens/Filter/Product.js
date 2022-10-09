import "./Product.css"

import React, { useEffect, Fragment, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { GetProduct } from "../../Redux/Actions/ProductsActions"
import { useParams } from "react-router-dom"
import ProductCard from "./ProductCard"
import Pagination from "react-js-pagination"
import { Slider } from "@material-ui/core"
import Loader from "../../config/Loader/loader"
import MetaData from "../../../MetaData"
const Products = () => {
    const [CurrentPage, setCurrentPage] = useState(1)
    const [Price, setPrice] = useState([0, 25000])
    const [Category, setCategory] = useState("")
    const dispatch = useDispatch()
    const {
        loading,
        // error,
        products,
        productsCount,
        resultPerPage,
        filteredProductCount
    } = useSelector(state => state.products)

    const { keyword } = useParams()

    useEffect(() => {
        dispatch(GetProduct(keyword, CurrentPage, Price, Category))
    }, [Category, CurrentPage, Price, dispatch, keyword])


    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const PriceHandle = (e, newPrice) => {
        setPrice(newPrice)

    }

    let count = filteredProductCount

    const Categories = [
        "Gadgets",
        "Bags",
        "Ladies Clothes",
        "Shoes",
        "jewellery"
    ]


    return (
        <Fragment>
            <MetaData title={"Products"} />

            <h1 className="homeHeading">Products</h1>

            <div className="container" id="container">

                {
                    loading ? (
                        <Loader />) : (

                        filteredProductCount !== 0 ? (
                            products.map(product => (
                                <ProductCard product={product} key={product?._id} />
                            ))
                        ) : (
                            <h2>No Product Found</h2>
                        )
                    )
                }

            </div>





            <div className="filterBox">
                <h3 className="filterName">Price</h3>
                <Slider
                    value={Price}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                    onChangeCommitted={PriceHandle}
                    step={100}
                />
                <h3 className="filterCategory">Categories</h3>
                <ul className="categoryBox">
                    {
                        Categories.map((category) => (
                            <li
                                className="category-link"
                                key={category}
                                onClick={() => {
                                    setCategory(category)
                                }}

                            >{category}</li>
                        ))
                    }
                </ul>
            </div>

            {resultPerPage < count && (
                <div className="paginationBox">
                    <Pagination
                        activePage={CurrentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
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
                </div>
            )
            }
        </Fragment>
    )
}

export default Products