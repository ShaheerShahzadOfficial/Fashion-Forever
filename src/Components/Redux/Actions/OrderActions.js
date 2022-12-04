import axios from "axios"
import { ALL_ORDER, ALL_ORDER_FAIL, ALL_ORDER_REQUEST, CREATE_NEW_ORDER, CREATE_NEW_ORDER_FAIL, CREATE_NEW_ORDER_REQUEST, DELETE_ORDER, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, MY_ORDER, MY_ORDER_FAIL, MY_ORDER_REQUEST, ORDER_DETAILS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, UPDATE_ORDER, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST } from "../Constants/constant"

const CreateOrder = (
    shippingInfo,
    orderItem,
    itemPrice,
    shippingPrice,
    totalPrice) => async (dispatch) => {

        dispatch({
            type: CREATE_NEW_ORDER_REQUEST
        })


        axios.post("https://forever-fashion-backend.vercel.app/order/createOrder",
            {
                shippingInfo,
                orderItem,
                itemPrice,
                shippingPrice,
                totalPrice,
            },
            {
                withCredentials: true,
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            }
        ).then((result) => {
            dispatch({
                type: CREATE_NEW_ORDER,
                payload: result.data
            })
        }).catch((err) => {
            dispatch({
                type: CREATE_NEW_ORDER_FAIL,
                payload: err.response.data.message
            })
        });


    }



const MyOrder = () => async (dispatch) => {

    dispatch({
        type: MY_ORDER_REQUEST
    })


    axios.get("https://forever-fashion-backend.vercel.app/order/myOrder",

        {
            withCredentials: true,
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        }
    ).then((result) => {
        dispatch({
            type: MY_ORDER,
            payload: result.data.orders
        })
    }).catch((err) => {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: err.response.data.message
        })
    });


}


const GetOrderDetail = (id) => async (dispatch) => {

    dispatch({
        type: ORDER_DETAILS_REQUEST
    })


    axios.get(`https://forever-fashion-backend.vercel.app/order/getOrderDetail/${id}`,

        {
            withCredentials: true,
            credentials: "include",
        }
    ).then((result) => {
        dispatch({
            type: ORDER_DETAILS,
            payload: result.data.order
        })
    }).catch((err) => {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response.data
        })
    });


}


const AdminAllOrder = () => async (dispatch) => {

    dispatch({
        type: ALL_ORDER_REQUEST
    })


    axios.get("https://forever-fashion-backend.vercel.app/order/myOrder",

        {
            withCredentials: true,
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        }
    ).then((result) => {
        dispatch({
            type: ALL_ORDER,
            payload: result.data.orders
        })
    }).catch((err) => {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: err.response.data.message
        })
    });


}


const deleteOrder = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });


    await axios.delete(`https://forever-fashion-backend.vercel.app/order/admin/deleteOrder/${id}`,
    {
        withCredentials: true,
        credentials: "include",
        headers: { "Content-Type": "application/json" }
    }).then((result) => {
        dispatch({
            type: DELETE_ORDER,
            payload: result.data.success,
        });
    }).catch((err) => {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: err.response.data,
        });
    });


};


const UpdateOrderStatus = (id, status) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_REQUEST });


    await axios.put(`https://forever-fashion-backend.vercel.app/order/admin/updateOrderStatus/${id}`, { status },
    {
        withCredentials: true,
        credentials: "include",
        headers: { "Content-Type": "application/json" }
    }
    ).then((result) => {
        dispatch({
            type: UPDATE_ORDER,
            payload: result.data.success,
        });
    }).catch((err) => {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: err.response.data,
        });
    });


};

// 
export {
    CreateOrder,
    MyOrder,
    GetOrderDetail,
    AdminAllOrder,
    deleteOrder,
    UpdateOrderStatus
}