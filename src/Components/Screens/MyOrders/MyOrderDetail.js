import { Typography } from '@material-ui/core'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../config/Loader/loader'
import { GetOrderDetail } from '../../Redux/Actions/OrderActions'
import "./MyOrderDetail.css"
const MyorderDetails = ({ match }) => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(GetOrderDetail(match.params.id))
    }, [dispatch, match.params.id])


    const { loading, orderDetails } = useSelector(state => state.OrderDetails)
    // const { user } = useSelector(state => state.Authentication)


    return (
        <Fragment>
            {loading ? <Loader /> :
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">
                            Order #{orderDetails && orderDetails?._id}
                        </Typography>
                        <Typography>Shipping Info</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Name:</p>
                                <span>{orderDetails?.User?.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>
                                    {orderDetails && orderDetails?.shippingInfo?.phoneNumber}
                                </span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>
                                    {orderDetails &&
                                        `${orderDetails?.shippingInfo?.address}, ${orderDetails?.shippingInfo?.city}, ${orderDetails?.shippingInfo?.state}, ${orderDetails?.shippingInfo?.postalCode}`}
                                </span>
                            </div>
                        </div>
                        <div className="orderDetailsContainerBox">

                            <div>
                                <p>Amount:</p>
                                <span>{orderDetails && orderDetails?.totalPrice}</span>
                            </div>
                        </div>

                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        orderDetails && orderDetails?.status === "Delivered"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {orderDetails && orderDetails?.status}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="orderDetailsCartItems">
                        <Typography>Order Items:</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {orderDetails?.orderItem &&
                                orderDetails?.orderItem?.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} x Rs{item.price} ={" "}
                                            <b>Rs{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>}
        </Fragment>
    )
}

export default MyorderDetails