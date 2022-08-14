import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const Product = ({ product }) => {
    const options = {
        edit: false,
        color: "grey",
        activeColor: "blue",
        size: window.innerWidth < 600 ? 15 : 25,
        value: product?.Ratings,
        isHalf: true
    }
    return (
        <div key={product?._id}>
            <Link className='productCard' to={`/product/${product?._id}`}>
                <img src={product?.images[0]?.url} alt={product?.name} />
                <h4>{product.name}</h4>
                <div>
                    <ReactStars {...options} />
                </div>
                <p> {product?.NumOfReview} Reviews</p>
                <span>Rs {product?.price}</span>
            </Link>
        </div>

    )
}

export default Product