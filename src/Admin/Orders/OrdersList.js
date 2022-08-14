import React, { Fragment, useEffect } from 'react'
import "./OrdersList.css"
import { useDispatch, useSelector } from "react-redux"

import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Slider from '../DashBoard/Slider/Slider';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Swal from "sweetalert2"
import { AdminAllOrder, deleteOrder } from '../../Components/Redux/Actions/OrderActions';
import { DELETE_ORDER_RESET } from '../../Components/Redux/Constants/constant';
const OrdersList = () => {

  const { order } = useSelector(state => state.orders)

  const { isDeleted } = useSelector(state => state.DeleteUpdateOrder)
  const dispatch = useDispatch()



  useEffect(() => {

    dispatch(AdminAllOrder())

    if (isDeleted === true) {
      dispatch({ type: DELETE_ORDER_RESET })
      Swal.fire("Order Has Been Deleted")
    }

  }, [dispatch, isDeleted])



  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },

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
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
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
          <Link to={`/admin/UpdateOrder/${params.getValue(params.id, "id")}`}>
            <EditIcon />
          </Link>

          <Button
            onClick={() => {
              dispatch(deleteOrder(params.getValue(params.id, "id")))
            }}
          >
            <DeleteIcon />
          </Button>
        </Fragment>

      ),
    },
  ];

  const rows = []
  order && order?.forEach(item => {
    rows.push({
      id: item._id,
      status: item.status,
      itemsQty: item.orderItem.length,
      amount: item.totalPrice,
    })
  });


  return (

    <Fragment>

      <div className="dashboard">
        <Slider />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Order</h1>

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

export default OrdersList