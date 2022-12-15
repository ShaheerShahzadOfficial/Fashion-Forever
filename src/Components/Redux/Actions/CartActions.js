import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO
} from "../Constants/constant";

const AddToCart = (id, quantity) => async (dispatch, getState) => {
  await axios
    .get(
      `https://forever-backend.vercel.app/products/ProductDetail/${id}`,
      {
        id,
        quantity
      },
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
    .then((result) => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          product: result.data.product._id,
          name: result.data.product.name,
          price: result.data.product.price,
          Stock: result.data.product.Stock,
          image: result.data.product.images[0].url,
          quantity
        }
      });
    });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItem));
};

const RemoveCartItem = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItem));
};

const ShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data
  });

  localStorage.setItem("Shipping Info", JSON.stringify(data));
};

export { AddToCart, RemoveCartItem, ShippingInfo };
