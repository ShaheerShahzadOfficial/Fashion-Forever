import "./AllProduct.css"
import React, { Fragment, useEffect } from 'react'
import { deleteProduct, GetAdminProduct } from '../../Components/Redux/Actions/ProductsActions'
import { useDispatch, useSelector } from "react-redux"

import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Slider from '../DashBoard/Slider/Slider';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_PRODUCT_RESET } from "../../Components/Redux/Constants/constant";
import Swal from "sweetalert2"
const AllProducts = ({ history }) => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const { isDeleted } = useSelector(
        (state) => state.product
    );

    useEffect(() => {

        dispatch(GetAdminProduct())

        if (isDeleted) {
            Swal.fire("Product Deleted Successfully");
            // history.push("/admin/Products");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }


    }, [dispatch, history, isDeleted])


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 250, flex: 1 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 250,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 250,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => (

                <Fragment>
                    <Link to={`/admin/UpdateProduct/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>

                    <Button
                        onClick={() =>
                            dispatch(deleteProduct(params.getValue(params.id, "id")))
                        }
                    >
                        <DeleteIcon />
                    </Button>
                </Fragment>

            ),
        },
    ];

    const rows = []
    products && products?.forEach(item => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
        })
    });

    return (
        <Fragment>

            <div className="dashboard">
                <Slider />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default AllProducts