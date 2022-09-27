
import React, { Fragment, useEffect, useState } from 'react'
import "./UpdateProfile.css"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { LoadUser, UpdateProfile } from '../../Redux/Actions/UserActions'
import Loader from '../../config/Loader/loader'
import { useHistory } from 'react-router-dom'
import { ClearError } from '../../Redux/Actions/ProductsActions'
import { UPDATE_PROFILE_RESET } from '../../Redux/Constants/constant'
import userpng from "../../Image/user.png"
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import MetaData from '../../../MetaData'
const UpdateUserProfile = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.Authentication)
    const { loading, isUpdated, error } = useSelector(state => state.profile)


    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [AvatarPreview, setAvatarPreview] = useState(userpng)

    let history = useHistory()
    useEffect(() => {

        if (!loading) {
            if (user) {
                setName(user?.name)
                setEmail(user?.email)
                setAvatarPreview(user?.avatar && user?.avatar?.url)
            }
        }



        if (isUpdated) {
            dispatch({
                type: UPDATE_PROFILE_RESET
            })

            Swal.fire("Success", "Your Profile is Updated", "success")


            dispatch(LoadUser())

            history.push("/Account")

        }

        if (error) {
            dispatch(ClearError())
        }



    }, [dispatch, error, history, isUpdated, loading, user])












    const handleUpdateProfile = () => {
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (Email !== "" && Name !== "") {

            if (email.test(Email) === true) {
                dispatch(UpdateProfile(Name, Email))


            } else {
                Swal.fire("Email Validation Failed", "Enter Valid Email", "warning")
            }

        } else {
            Swal.fire("Presence Alert", "Enter Email And Name", "warning")
        }
    }

    return (
        <Fragment>
            <MetaData title={"Update Profile"} />
            {loading ? <Loader /> : <div className="mainContainers">
                <div className="subContainers">
                    <h2 className='heading' style={{ width: "80%" }}>Update Your Profile</h2>
                    <div className="Form">
                        <img src={AvatarPreview} alt={Name} className="avatar" />
                        <br />
                        <br />
                        <div>
                            <AccountCircleSharpIcon />

                            <input type={"text"} className="passwordField" placeholder='Name' value={Name} onChange={event => setName(event.target.value)} />
                        </div>
                        <br />
                        <br />
                        <div>
                            <AlternateEmailSharpIcon />

                            <input type={"email"} placeholder='Email' className="passwordField" value={Email} onChange={event => setEmail(event.target.value)} />
                        </div>
                        <br />
                        <br />
                        <button onClick={handleUpdateProfile}>Update Profile</button>
                    </div>
                </div>
            </div>}
        </Fragment>)

}
export default UpdateUserProfile
