import "./Confirmation.css"
import { Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import CheckOutStep from '../ShippingInfo/CheckOutStep'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { CreateOrder } from "../../Redux/Actions/OrderActions"
import Loader from "../../config/Loader/loader"
import Swal from "sweetalert2"


const Confirmation = ({ history }) => {
    const { shippingInfo, cartItem } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.Authentication)
    const { loading } = useSelector(state => state.orders)



    const dispatch = useDispatch()

    const subtotal = cartItem.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    // const shippingCharges = subtotal > 1000 ? 0 : 200;

    let shippingCharges;

    if (shippingInfo?.city.toLowerCase() === "karachi") {
        shippingCharges = 250;
    } else {
        shippingCharges = 350
    }

    const totalPrice = subtotal + shippingCharges;

    const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.postalCode}`;



    const PlaceOrder = () => {
        dispatch(CreateOrder(shippingInfo, cartItem, subtotal, shippingCharges, totalPrice))
        Swal.fire("Order Alert", "Order Has been Placed", "success")
        history.push("/")
    }


    return (

        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <div className='checkout'>
                        <CheckOutStep activeStep={1} />
                    </div>


                    <div className="ConfirmOrderPage">
                        <div>
                            <div className="confirmshippingArea">
                                <Typography>Shipping Info</Typography>
                                <div className="confirmshippingAreaBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{user?.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>{shippingInfo?.phoneNumber}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>{address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="confirmCartItems">
                                <Typography>Your Cart Items:</Typography>
                                <div className="confirmCartItemsContainer">
                                    {cartItem &&
                                        cartItem.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                                <span>
                                                    {item.quantity} x Rs {item.price} ={" "}
                                                    <b>Rs {item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>



                        <div>
                            <div className="orderSummary">
                                <Typography>Order Summery</Typography>
                                <div>
                                    <div>
                                        <p>Subtotal:</p>
                                        <span>Rs {subtotal}</span>
                                    </div>
                                    <div>
                                        <p>Shipping Charges:</p>
                                        <span>Rs {shippingCharges}</span>
                                    </div>
                                </div>

                                <div className="orderSummaryTotal">
                                    <p>
                                        <b>Total:</b>
                                    </p>
                                    <span>Rs {totalPrice}</span>
                                </div>

                            </div>
                            <button className="placeOrderBtn" onClick={PlaceOrder}>Place Order</button>

                        </div>


                    </div>
                </Fragment>

            }


        </Fragment>

    )
}

export default Confirmation