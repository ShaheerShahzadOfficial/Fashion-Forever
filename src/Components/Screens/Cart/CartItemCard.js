import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { RemoveCartItem } from '../../Redux/Actions/CartActions'
import "./CartItemCard.css"

const CartItemCard = ({ item }) => {
    const dispatch = useDispatch()
    return (
        <div className='CartItemCard'>
            <img src={item.image} alt={item.name} />

            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: Rs ${item.price}`}</span>
                <p onClick={() => {
                    dispatch(RemoveCartItem(item.product))
                }}>Remove</p>
            </div>

        </div>
    )
}

export default CartItemCard