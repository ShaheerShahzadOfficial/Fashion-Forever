import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetProductDetail, updateProduct } from '../../../Components/Redux/Actions/ProductsActions'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Swal from "sweetalert2"
import { Fragment } from 'react'
import Slider from '../../DashBoard/Slider/Slider'
import { Button } from '@material-ui/core'
import { UPDATE_PRODUCT_RESET } from '../../../Components/Redux/Constants/constant'
import Loader from '../../../Components/config/Loader/loader'


const UpdateProduct = ({ history }) => {

    const { loading, isUpdated } = useSelector(state => state.product)


    const { product } = useSelector(state => state.productDetail)

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState("");


    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(GetProductDetail(id));
        } else {
            setName(product?.name);
            setDescription(product?.description);
            setPrice(product?.price);
            setCategory(product?.category);
            setStock(product?.Stock);
        }



        // dispatch(GetProductDetail(id))

        if (isUpdated) {
            Swal.fire("Product Updated Successfully");
            dispatch({ type: UPDATE_PRODUCT_RESET });
            history.push("/admin/DashBoard");

        }


    }, [dispatch, history, id, isUpdated, product])







    const categories = [
        "Gadgets",
        "Bags",
        "Ladies Clothes",
        "Shoes"
    ];

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProduct(id, name, price, description, category, Stock));
    };




    return (
        <Fragment>
            {
                loading === true ? <Loader /> :
                    <div className="dashboard">
                        <Slider />
                        <div className="newProductContainer">
                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={createProductSubmitHandler}
                            >
                                <h1>Update Product</h1>

                                <div>
                                    <SpellcheckIcon />
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <AttachMoneyIcon />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <DescriptionIcon />

                                    <textarea
                                        placeholder="Product Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        cols="30"
                                        rows="1"
                                    ></textarea>
                                </div>

                                <div>
                                    <AccountTreeIcon />
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Choose Category</option>
                                        {categories.map((cate) => (
                                            <option key={cate} value={cate}>
                                                {cate}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <StorageIcon />
                                    <input
                                        type="number"
                                        placeholder="Stock"
                                        required
                                        value={Stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <Button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    Update Product
                                </Button>
                            </form>
                        </div>
                    </div>
            }
        </Fragment>

    )

}

export default UpdateProduct