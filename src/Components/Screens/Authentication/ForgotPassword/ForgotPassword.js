import React, { useEffect, useState } from 'react'
import "./ForgotPassword.css"
import { useDispatch, useSelector } from "react-redux"
import { ForgotPasswordEmail } from '../../../Redux/Actions/UserActions'
import Swal from 'sweetalert2'
import { FORGOT_PASSWORD_EMAIL_RESET } from '../../../Redux/Constants/constant'
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import MetaData from '../../../../MetaData'

const ForgotPassword = () => {
    const [Email, setEmail] = useState("")

    const dispatch = useDispatch()
    const { message, error, loading } = useSelector(state => state.Authentication)

    useEffect(() => {
        if (!loading) {

            if (message) {
                let New = message.message
                if (New === `Password Reset Email is sended to ${Email} Successfully`) {
                    Swal.fire(
                        "Email has been sended",
                        `Email has been successfully sended to ${Email}`,
                        'success'
                    )
                    dispatch({ type: FORGOT_PASSWORD_EMAIL_RESET })
                }
            }


        }


        if (error === "User Not Found") {
            Swal.fire(
                "Error occurred",
                "No User Found with this Email",
                'error'
            )
        }
    }, [Email, dispatch, error, loading, message])

    const handleForgotPassword = () => {
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (Email !== "") {

            if (email.test(Email) === true) {

                dispatch(ForgotPasswordEmail(Email))



            } else {
                Swal.fire("Email Validation Failed", "Enter Valid Email", "warning")
            }

        } else {
            Swal.fire("Presence Alert", "Enter Email", "warning")
        }
    }

    return (
        <div className="mainContainers">
            <MetaData title={"Forget Password"} />
            <div className="subContainers">
                <h2>Forgot Password</h2>
                <div className="Form">
                    <div>
                        <AlternateEmailSharpIcon />
                        <input className='Input' type={"email"} placeholder='Email' value={Email} onChange={event => setEmail(event.target.value)} />
                    </div>                    <br />
                    <br />
                    <button onClick={handleForgotPassword}>Send Password Reset Email </button>
                </div>
            </div>
        </div>)
}

export default ForgotPassword