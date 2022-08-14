import React, { Fragment, useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux"

import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Slider from '../DashBoard/Slider/Slider';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import Swal from "sweetalert2"
import { AdminAllUser, DeleteUser } from '../../Components/Redux/Actions/UserActions';


const UserList = () => {

    const { users } = useSelector(state => state.AllUser)

    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(AdminAllUser())

    }, [dispatch])



    const columns = [
        { field: "id", headerName: "User ID", minWidth: 250, flex: 0.8 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 0.6,
        },
        {
            field: "email",
            headerName: "Email",
            // type: "number",
            minWidth: 200,
            flex: 0.6,
        },
        {
            field: "role",
            headerName: "Role",
            // type: "number",
            minWidth: 200,
            flex: 0.4,
        },
        {
            field: "actions",
            flex: 0.5,
            headerName: "Actions",
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (

                <Fragment>
                    <Link to={`/admin/UpdateUser/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>

                    <Button
                        onClick={() =>
                            dispatch(DeleteUser(params.getValue(params.id, "id")))
                        }
                    >
                        <DeleteIcon />
                    </Button>
                </Fragment>

            ),
        },
    ];




    const rows = []
    users && users?.forEach(item => {
        rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role
        })
    });


    return (
        <Fragment>
            <div className="dashboard">
                <Slider />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL Users</h1>

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

export default UserList