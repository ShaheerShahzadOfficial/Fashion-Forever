import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Swal from "sweetalert2"
import { Fragment } from 'react'
import Slider from '../../DashBoard/Slider/Slider'
import { Button } from '@material-ui/core'
import { getUserDetails, UpdateUserRole } from '../../../Components/Redux/Actions/UserActions';
import { ADMIN_UPDATE_USERS_RESET } from '../../../Components/Redux/Constants/constant';



const UpdateUser = ({ history }) => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Role, setRole] = useState("");

    const { user } = useSelector(state => state.userDetails)
    const { isUpdated } = useSelector(state => state.DeleteUpdateUser)


    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user && user?._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user?.name);
            // setRole(user.role);
            setEmail(user?.email);
        }



        dispatch(getUserDetails(id))

        if (isUpdated) {
            Swal.fire("User Role Updated Successfully");
            dispatch({ type: ADMIN_UPDATE_USERS_RESET });
            history.push("/admin/DashBoard");

        }


    }, [dispatch, history, id, isUpdated, user])







    const Roles = [
        "User", "Admin"
    ];

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(UpdateUserRole(id, Name, Email, Role));
    };



    return (
        <Fragment>
            {/* {
                loading === true ? <Loader /> : */}
            <div className="dashboard">
                <Slider />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Update User Role</h1>

                        <div>
                            <AlternateEmailSharpIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                                readOnly
                            />
                        </div>
                        <div>
                            <VpnKeyIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly
                            />
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select
                                value={Role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {Roles.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button
                            id="createProductBtn"
                            type="submit"
                        // disabled={loading ? true : false}
                        >
                            Update User Role
                        </Button>
                    </form>
                </div>
            </div>
            {/* } */}
        </Fragment>

    )

}

export default UpdateUser