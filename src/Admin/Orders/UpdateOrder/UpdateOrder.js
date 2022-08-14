import "./UpdateOrder.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Swal from "sweetalert2"
import { Fragment } from 'react'
import Slider from '../../DashBoard/Slider/Slider'
import { Button, Typography } from '@material-ui/core'
import { UPDATE_ORDER_RESET } from '../../../Components/Redux/Constants/constant'
import Loader from '../../../Components/config/Loader/loader'
import { GetOrderDetail, UpdateOrderStatus } from '../../../Components/Redux/Actions/OrderActions'


const UpdateOrder = ({ history }) => {

    const { loading, isUpdated } = useSelector(state => state.DeleteUpdateOrder)


    const { orderDetails } = useSelector(state => state.OrderDetails)



    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (orderDetails && orderDetails._id !== id) {
            dispatch(GetOrderDetail(id));
        }


        // dispatch(GetProductDetail(id))

        if (isUpdated) {
            Swal.fire("Product Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
            history.push("/admin/DashBoard");
        }


    }, [dispatch, history, id, isUpdated, orderDetails])



    const [status, setStatus] = useState("");


    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(UpdateOrderStatus(id, status));

    }

    return (
        <Fragment>
            <div className="dashboard">
                <Slider />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: orderDetails?.status === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{orderDetails?.User && orderDetails?.User.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {orderDetails?.shippingInfo && orderDetails?.shippingInfo?.phoneNumber}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {orderDetails?.shippingInfo &&
                                                    `${orderDetails?.shippingInfo?.address}, ${orderDetails?.shippingInfo?.city}, ${orderDetails?.shippingInfo?.state}, ${orderDetails?.shippingInfo.postalCode}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">

                                        <div>
                                            <p>Amount:</p>
                                            <span>{orderDetails?.totalPrice && orderDetails?.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    orderDetails?.status && orderDetails?.status === "Delivered"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {orderDetails?.status && orderDetails?.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {orderDetails?.orderItem &&
                                            orderDetails?.orderItem.map((item) => (
                                                <div key={item?.product}>
                                                    <img src={item?.image} alt="Product" />
                                                    <Link to={`/product/${item?.product}`}>
                                                        {item.name}
                                                    </Link>{" "}
                                                    <span>
                                                        {item?.quantity} X Rs {item?.price} ={" "}
                                                        <b>Rs {item?.price * item?.quantity}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display: orderDetails?.status === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {orderDetails?.status === "Proccessing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {orderDetails?.status === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            loading ? true : false || orderDetails?.status === "Delivered" ? true : false
                                        }
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );



}

export default UpdateOrder