import "./ProductDetails.css"
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { AddReviews, GetProductDetail } from '../../Redux/Actions/ProductsActions'
import { useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactStars from "react-rating-stars-component"
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material"
import { Rating } from "@material-ui/lab";
import { DialogTitle } from "@material-ui/core"
import Loader from "../../config/Loader/loader"
import { AddToCart } from "../../Redux/Actions/CartActions"
import Swal from "sweetalert2"
import MetaData from "../../../MetaData"
const ProductDetails = () => {
    const [ProdutDetail, setProductDetail] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [comment, setComment] = useState("")
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(1)

    const dispatch = useDispatch()
    const {
        loading,
        product,
    } = useSelector(state => state.productDetail)

    const { id } = useParams()

    useEffect(() => {

        if (loading) {
            <div style={{ margin: "10px" }}>
                <Loader />
            </div>
        } else {
            dispatch(GetProductDetail(id))
            setProductDetail([product])
        }


    }, [dispatch, id, loading, product])



    const options = {
        edit: false,
        color: "grey",
        activeColor: "yellow",
        size: window.innerWidth < 600 ? 20 : 30,
        value: product && product?.Ratings,
        isHalf: true,
        borderColor: "grey"
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reviewSubmitHandler = () => {

        dispatch(AddReviews(id, rating, comment));

        setOpen(false);
    };



    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    return (
        <Fragment>
            <MetaData title={"Product Details"} />
            {loading ? (
                <Loader />) : (
                ProdutDetail && ProdutDetail.map((items, i) => (
                    <div key={items._id} style={{ padding: "20px" }}>
                        <h2 style={{ "textAlign": "center" }}>Product Detail</h2>

                        <div className="card">

                        <div className="ProductsImages">

                            <Carousel className="Carousel" showThumbs={false} showArrows={true} autoPlay={true} showStatus={true} infiniteLoop={true} interval={5000} dynamicHeight={true}>
                                {
                                    product?.images && product?.images?.map((item, i) => (
                                        <img key={i} src={item.url} alt={items.name} />
                                    ))
                                }
                            </Carousel>
</div>

<div className="Details">

                            <h2>Name: {items?.name}</h2>
                            <p className="price">Price: Rs {items?.price}</p>
                            <br />
                            <p><strong>Description: </strong> {items?.description}</p>
                            <br />
                            <p><b> Status </b> <b className={items?.Stock < 1 ? "Red" : "Green"}>{items?.Stock < 1 ? "Out Of  Stock" : "InStock"}</b></p>
                           <br />
                            <div className="quantityIncrease">

                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" className="input" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product?.Stock < 1 ? true : false}
                                        onClick={() => {
                                            dispatch(AddToCart(id, quantity))
                                            Swal.fire("", "Item Added to the Cart", "success")
                                        }}
                                    >
                                        Add to Cart
                                    </button>

                                </div>
                            </div>

                        </div>

                        </div>
                    </div>
                ))
            )
            }

            <br />
            <br />
            {/* <br /> */}

            <div className="Review_Container">

                <h1 className="homeHeading">Customer Reviews</h1>

                <button onClick={handleClickOpen}>Write Your Review</button>




                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={handleClickOpen}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />

                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>























                {
                    product.Review && product.Review[0] ? (
                        <Carousel showThumbs={false} showArrows={true} autoPlay={true} showStatus={true} infiniteLoop={true} interval={5000} centerMode={true}
                            centerSlidePercentage={100} dynamicHeight={true} color={"black"} >
                            {


                                product.Review.map((item, i) => (
                                    <div className="cards" key={i} >
                                        <h3>{item.name}</h3>
                                        <ReactStars {...options} />
                                        <p>{item.comment}</p>
                                    </div>
                                ))


                            }
                        </Carousel>
                    ) : (
                        <div className="NoReview">
                            <p>No Review Yet</p>
                            <p>Be the First to Review it</p>
                        </div>
                    )


                }














            </div>

        </Fragment >
    )
}

export default ProductDetails