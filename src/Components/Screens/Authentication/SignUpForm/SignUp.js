import React, { useEffect, useState } from 'react'
import "./signup.css"
import { useDispatch, useSelector } from "react-redux"
import { RegisterUser } from '../../../Redux/Actions/UserActions'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../../../config/Loader/loader'
import Swal from 'sweetalert2'
import userpng from "../../../Image/user.png"
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MetaData from '../../../../MetaData'

const SignUp = () => {
    const dispatch = useDispatch()
    const [UserName, setUserName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const { loading, error, isAuthenticated } = useSelector(state => state.Authentication)
    const [avatarPreview, setAvatarPreview] = useState(userpng)
    const [avatar, setAvatar] = useState(userpng)
    let history = useHistory()

    useEffect(() => {

        if (isAuthenticated) {
            history.push("/Account")
        }

        if (error === "User All Ready Exist") {
            Swal.fire("Autentication Failed", "You Are Already Registered", "error")
        }

    }, [error, history, isAuthenticated])




    const registerDataChange = (event) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                console.log(reader.result)
                uploadAvatar(event.target.files[0])
            }
        };

        reader.readAsDataURL(event.target.files[0]);

    }

    const uploadAvatar = (base64EncodedImage) => {
        setAvatar(base64EncodedImage);

    }


    const handleSignUp = () => {
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const Pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;

        if (UserName !== "" && Email !== "" && Password !== "" && ConfirmPassword !== "") {

            if (email.test(Email) === true) {
                if (Pass.test(Password) === true) {

                    if (Password === ConfirmPassword) {
                        dispatch(RegisterUser(UserName, Email, Password, avatar))
                    } else {
                        Swal.fire("Password Verification Failed", "Password and Confirm Password Should be Same", "warning")

                    }


                } else {
                    Swal.fire("Password Validation Failed", "Password Must contain letter Number and Symbols and Capital Letter", "warning")
                }
            } else {
                Swal.fire("Email Validation Failed", "Enter Valid Email", "warning")
            }

        } else {
            Swal.fire("Presence Alert", "Enter  UserName  Email And Password", "warning")
        }
    }

    return (

        <div className="mainContainer">
            <MetaData title={"Register"} />
            {loading ? (
                <Loader />) : (

                <div className="subContainer">

                    <h2>Registration Form</h2>
                    <div className="formController">

                        <div>
                            <AccountCircleSharpIcon />
                            <input type={"text"} placeholder='UserName' value={UserName} onChange={event => setUserName(event.target.value)} />
                        </div>
                        <br />
                        <br />
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
                        <div>
                            <VpnKeyIcon />
                            <input type={"password"} placeholder='Confirm Password' value={ConfirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
                        </div>

                        <br />
                        <br />
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            /></div>
                        <br />
                        <br />

                        <button onClick={handleSignUp}>SignUp</button>
                        <br />
                        <br />
                        <Link to={"/Login"} style={{ textDecoration: "none" }}> <p className='Redirect'>Already Registered ? SignIn</p> </Link>

                    </div>
                </div>)}
        </div>

    )
}

export default SignUp