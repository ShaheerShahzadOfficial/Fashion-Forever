
import React, { Fragment, useEffect, useState } from 'react'
import "./UpdatePassword.css"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { LoadUser, UpdatePassword } from '../../Redux/Actions/UserActions'
import Loader from '../../config/Loader/loader'
import { useHistory } from 'react-router-dom'
import { ClearError } from '../../Redux/Actions/ProductsActions'
import { UPDATE_PASSWORD_RESET } from '../../Redux/Constants/constant'
import userpng from "../../Image/user.png"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MetaData from "../../../MetaData"
const UpdateUserPassword = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.Authentication)
    const { loading, isUpdated, error } = useSelector(state => state.updatePassword)

    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [Password, setPassword] = useState("")
    const [AvatarPreview, setAvatarPreview] = useState(userpng)
    const [Name, setName] = useState("")



    let history = useHistory()
    useEffect(() => {

        if (isUpdated) {
            Swal.fire("Success", "Your Password is Updated", "success")
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
            dispatch(LoadUser())

            history.push("/Account")

        }

        if (user) {
            setAvatarPreview(user?.avatar && user?.avatar?.url)
            setName(user?.name)
        }


        if (error) {
            dispatch(ClearError())
        }

    }, [dispatch, error, history, isUpdated, loading, user])





    const handleUpdatePassword = () => {
        const Pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
        if (Password !== "" && ConfirmPassword !== "") {

            if (Pass.test(Password) === true) {
                if (Password === ConfirmPassword) {
                    dispatch(UpdatePassword(Password, ConfirmPassword))
                } else {
                    Swal.fire("Password Verification Failed", "Password and ResetPassword Must be same", "error")
                }
            } else {
                Swal.fire("Password Validation Failed", "Password Must contain letter Number and Symbols and Capital Letter", "warning")

            }


        } else {
            Swal.fire("Presence Alert", "Enter Password And Confirm Password", "warning")
        }
    }

    return (
        <Fragment>
            <MetaData title={"Update Password"} />
            {loading ? <Loader /> : <div className="mainContainers">
                <div className="subContainers">
                    <h2 style={{ width: "80%" }}>Update Your Password</h2>
                    <div className="Form">
                        <img src={AvatarPreview} alt={Name} className="avatar" />
                        <br />
                        <br />
                        <div>
                            <VpnKeyIcon />
                            <input type={"password"} className="passwordField" placeholder='New Password' value={Password} onChange={event => setPassword(event.target.value)} />
                        </div>
                        <br />
                        <br />
                        <div>
                            <VpnKeyIcon />
                            <input type={"password"} placeholder='Confirm Password' className="passwordField" value={ConfirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
                        </div>

                        <br />
                        <br />
                        <button onClick={handleUpdatePassword}>Update Password</button>
                    </div>
                </div>
            </div>}
        </Fragment>)

}
export default UpdateUserPassword
