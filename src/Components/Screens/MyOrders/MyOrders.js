import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Loader from '../../config/Loader/loader'
import { MyOrder } from '../../Redux/Actions/OrderActions'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { Typography } from '@mui/material';
import "./MyOrders.css"
import MetaData from '../../../MetaData';

const MyOrders = () => {

    const { loading, order } = useSelector(state => state.orders)
    const { user } = useSelector(state => state.Authentication)


    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(MyOrder())

    }, [dispatch])

    const columns = [{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
                ? "greenColor"
                : "redColor";
        },
    },
    {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.3,
    },

    {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
    },

    {
        field: "action",
        headerName: "Actions",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        sortable: false,
        renderCell: (params) => (
            <Link to={`/orderDetail/${params.getValue(params.id, "id")}`}>
                <LaunchIcon color='black' fontSize='large' />
            </Link>
        )
    },
    ];

    const rows = [];


    order && order?.forEach(item => {
        rows.push({
            itemsQty: item.orderItem?.length,
            id: item?._id,
            status: item?.status,
            amount: item?.totalPrice
        })
    });



    return (
        <Fragment>
            <MetaData title={"My Orders"} />
            {
                loading ? <Loader /> :
                    <Fragment>

                        <div className="myOrderPage">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className="myOrdersTable"
                                autoHeight
                            />

                            <Typography className='myOrdersHeading'>{user?.name}'s Orders</Typography>

                        </div>

                    </Fragment>
            }
        </Fragment>)
}

export default MyOrders