import axios from "axios";

import {
    ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS,
    CLEAR_ERROR,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    CREATE_NEW_PRODUCT_SUCCESS,
    CREATE_NEW_PRODUCT_FAIL,
    CREATE_NEW_PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST
} from "../Constants/constant";


export const GetProduct = (keyword = "", CurrentPage = 1, Price = [1000, 25000], Category) => async (dispatch) => {

    dispatch({
        type: ALL_PRODUCT_REQUEST
    })

    let link = `https://forever-fashion-backend.vercel.app/products/getProduct?keyword=${keyword}&page=${CurrentPage}&price[gte]=${Price[0]}&price[lte]=${Price[1]}`

    if (Category) {
        link = `https://forever-fashion-backend.vercel.app/products/getProduct?keyword=${keyword}&page=${CurrentPage}&price[gte]=${Price[0]}&price[lte]=${Price[1]}&category=${Category}`
    }

    await axios.get(link).then((result) => {
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: err.message
        })
    });





}


export const GetProductDetail = (id) => async (dispatch) => {

    dispatch({
        type: PRODUCT_DETAIL_REQUEST
    })

    await axios.get(`https://forever-fashion-backend.vercel.app/products/ProductDetail/${id}`).then((result) => {
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: err.message
        })
    });





}

export const ClearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}


export const AddReviews = (productId, rating, comment) => async (dispatch) => {

    await axios.put("https://forever-fashion-backend.vercel.app/products/addProductReview", {
        productId,
        rating,
        comment
    }, { withCredentials: true, credentials: "include", headers: { "Content-Type": "application/json" } }).then((result) => {
        dispatch({
            type: ADD_REVIEW_SUCCESS,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload: err.message

        })
    });
}





export const CreateNewProduct = (name, description, price, category, Stock, images) => async (dispatch) => {
    dispatch({
        type: CREATE_NEW_PRODUCT_REQUEST
    })
    await axios.post("https://forever-fashion-backend.vercel.app/products/newProduct", {
        name, description, price, category, Stock, images
    }, { withCredentials: true, credentials: "include", headers: { "Content-Type": "application/json" } }).then((result) => {
        dispatch({
            type: CREATE_NEW_PRODUCT_SUCCESS,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: CREATE_NEW_PRODUCT_FAIL,
            payload: err.response.data

        })
    });
}

export const GetAdminProduct = () => async (dispatch) => {

    dispatch({
        type: ADMIN_PRODUCT_REQUEST
    })

    await axios.get("https://forever-fashion-backend.vercel.app/products/admin/getProduct",
        { withCredentials: true, credentials: "include", headers: { "Content-Type": "application/json" } }
    ).then((result) => {
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: err.message
        })
    });





}




export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    // http://localhost:4000

    await axios.delete(`https://forever-fashion-backend.vercel.app/products/deleteProduct/${id}`,
        { withCredentials: true, credentials: "include", headers: { "Content-Type": "application/json" } }).then((result) => {
            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
                payload: result.data,
            });
        }).catch((err) => {
            dispatch({
                type: DELETE_PRODUCT_FAIL,
                payload: err.response.data,
            });
        });


};



export const updateProduct = (id, name, price, description, category, Stock, images) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });


    await axios.put(`https://forever-fashion-backend.vercel.app/products/updateProduct/${id}`, {
        name, price, description, category, Stock, images
    }, { withCredentials: true, credentials: "include", headers: { "Content-Type": "application/json" } }).then((result) => {
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: result.data,
        });
    }).catch((err) => {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: err.response.data,
        });
    });


};