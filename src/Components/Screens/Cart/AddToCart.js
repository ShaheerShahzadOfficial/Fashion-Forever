import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart } from '../../Redux/Actions/CartActions'
import "./AddToCart.css"
import CartItemCard from "./CartItemCard.js"
import RemoveShoppingCartTwoToneIcon from '@mui/icons-material/RemoveShoppingCartTwoTone';
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const Cart = ({ history }) => {

  const dispatch = useDispatch()
  const { cartItem } = useSelector(state => state.cart)


  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItem.length === 0 ? (
        <div className='emptyCart'>
          <RemoveShoppingCartTwoToneIcon color='blue' />

          <Typography>No Product in Your Cart</Typography>

          <Link to={"/products"}>View Products</Link>

        </div>
      ) : (
        <Fragment>
          <div className="cardPage">

            <div className="cartHeader">
              <p> Product </p>
              <p> Quantity </p>
              <p> SubTotal </p>
            </div>


            {
              cartItem && cartItem.map(items => (
                <div className="cartContainer" key={items.product}>
                  <CartItemCard item={items} />

                  <div className="cardInput">
                    <button
                      onClick={() => {
                        const newQty = items.quantity - 1;
                        if (1 >= items.quantity) {
                          return;
                        }
                        dispatch(AddToCart(items.product, newQty));

                      }}>-</button>

                    <input readOnly value={items.quantity} />

                    <button onClick={() => {
                      const newQty = items.quantity + 1;
                      if (items.Stock <= items.quantity) {
                        return;
                      }
                      dispatch(AddToCart(items.product, newQty));
                    }}>+</button>

                  </div>

                  <p className='cartSubTotal'>{`Rs ${items.price * items.quantity}`}</p>

                </div>
              ))
            }



            <div className="GrossTotal">
              <div></div>
              <div className="GrossTotalBox">
                <p>Total</p>
                <p>{`Rs ${cartItem.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className='CheckOutBtn'>
                <button onClick={checkoutHandler}> CheckOut </button>
              </div>
            </div>


          </div>
        </Fragment>
      )}
    </Fragment>





  )
}

export default Cart