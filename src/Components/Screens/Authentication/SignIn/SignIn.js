import React, { useEffect, useState } from 'react'
import "./signin.css"
import { Login } from '../../../Redux/Actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loader from '../../../config/Loader/loader'
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
const SignIn = ({ location }) => {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const dispatch = useDispatch()

    const { loading, error, isAuthenticated } = useSelector(state => state.Authentication)


    var history = useHistory()


    const redirect = location.search ? location.search.split("=")[1] : "/Account";


    useEffect(() => {

        if (isAuthenticated === true) {
            history.push(redirect)
        }





    }, [history, isAuthenticated, redirect])




    const handleSignIn = () => {
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const Pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;

        if (Email !== "" && Password !== "") {

            if (email.test(Email) === true) {
                if (Pass.test(Password) === true) {

                    dispatch(Login(Email, Password))

                    if (error) {
                        if (error.message === "Cannot read properties of null (reading 'password')") {
                            Swal.fire("Authentication Failed", "Invalid Email OR Password", "error")
                        }
                        if (error.msg === "😡👿Eamil or Password not matched 😡👿") {
                            Swal.fire("Authentication Failed", "Invalid Email OR Password", "error")

                        }
                    }



                } else {
                    Swal.fire("Password Validation Failed", "Password Must contain letter Number and Symbols and Capital Letter", "warning")
                }
            } else {
                Swal.fire("Email Validation Failed", "Enter Valid Email", "warning")
            }

        } else {
            Swal.fire("Presence Alert", "Enter Email And Password", "warning")
        }



    }


    return (

        <div className="mainContainer">
            {loading ? (
                <Loader />) : (

                <div className="subContainer">
                    <h2>Sign In Form</h2>
                    <div className="formController">
                        <div>
                            <AlternateEmailSharpIcon />
                            <input type={"email"} placeholder='Email' value={Email} onChange={event => setEmail(event.target.value)} />
                        </div>
                        <br />
                        <br />
                        <div>
                            <VpnKeyIcon />
                            <input type={"password"} placeholder='Password' value={Password} onChange={event => setPassword(event.target.value)} />
                        </div>
                        <br />
                        <br />
                        <button onClick={handleSignIn}>Log In</button>
                        <Link to={"/ForgotPassword"} style={{ textDecoration: "none" }}>  <p className='ForgotPassword'>Forgot Password</p> </Link>
                        <br />
                        <Link to={"/Register"} style={{ textDecoration: "none" }}> <p className='Redirect'>Not Registered ? SignUp</p> </Link>
                    </div>
                </div>)}
        </div>

    )
}

export default SignIn