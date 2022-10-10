import axios from "axios"

import { FORGOT_PASSWORD_EMAIL, FORGOT_PASSWORD_EMAIL_FAIL, LOAD_USER, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGOUT_USER, LOGOUT_USER_FAIL, REGISTER_USER, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, UPDATE_PROFILE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD, UPDATE_PASSWORD_FAIL, RESET_PASSWORD_EMAIL, RESET_PASSWORD_EMAIL_REQUEST, RESET_PASSWORD_EMAIL_FAIL, ADMIN_ALL_USERS_REQUEST, ADMIN_ALL_USERS_SUCCESS, ADMIN_ALL_USERS_FAIL, ADMIN_DELETE_USERS_REQUEST, ADMIN_DELETE_USERS_SUCCESS, ADMIN_DELETE_USERS_FAIL, ADMIN_UPDATE_USERS_REQUEST, ADMIN_UPDATE_USERS_SUCCESS, ADMIN_UPDATE_USERS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS, USER_DETAILS_FAIL } from "../Constants/constant";


export const RegisterUser = (name, email, password, avatar) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    await axios.post("https://foreverfashion.herokuapp.com/user/register", {
        name, email, password, avatar
    }, config).then((result) => {
        dispatch({
            type: REGISTER_USER,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: err.response.data.message
        })
    });

}


export const Login = (email, password) => async (dispatch) => {

    dispatch({ type: LOGIN_USER_REQUEST });


    // const config = { headers: { "Content-Type": "application/json" } }

    await axios.post("https://foreverfashion.herokuapp.com/user/login", {
        email, password
    }, { withCredentials: true, credentials: "include", headers: { "Content-Type": "application/json" } }).then((result) => {
        dispatch({
            type: LOGIN_USER,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: err.response.data

        })
    });

}



export const ForgotPasswordEmail = (email) => async (dispatch) => {

    await axios.post("https://foreverfashion.herokuapp.com/user/resetPassword", {
        email
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: FORGOT_PASSWORD_EMAIL,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: FORGOT_PASSWORD_EMAIL_FAIL,
            payload: err.response.data.message

        })
    });

}



export const Logout = () => async (dispatch) => {

    await axios.get("https://foreverfashion.herokuapp.com/user/logout", {
        withCredentials: true, credentials: "include"
    }).then(() => {
        dispatch({
            type: LOGOUT_USER,
        })
    }).catch((err) => {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: err.response.data.message
        })
    });

}



export const LoadUser = () => async (dispatch) => {
    try {


        dispatch({ type: LOAD_USER_REQUEST });


        const { data } = await axios.get("https://foreverfashion.herokuapp.com/user/userDetails", { withCredentials: true, credentials: "include" })
        dispatch({
            type: LOAD_USER,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data
        })
    }

}


export const UpdateProfile = (name, email) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });


    await axios.put("https://foreverfashion.herokuapp.com/user/UpdateUserProfile", {
        name, email
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: UPDATE_PROFILE,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: err.response.data.message
        })
    });

}


export const UpdatePassword = (newPassword, confirmPassword) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });


    await axios.put("https://foreverfashion.herokuapp.com/user/UpdatePassword", {
        newPassword, confirmPassword
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: UPDATE_PASSWORD,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: err.response.data.message
        })
    });

}


export const ResetPassword = (token, password, confirmPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_EMAIL_REQUEST });


    await axios.put(`https://foreverfashion.herokuapp.com/user/resetPassword/${token}`, {
        password, confirmPassword
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: RESET_PASSWORD_EMAIL,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: RESET_PASSWORD_EMAIL_FAIL,
            payload: err.response.data.message
        })
    });

}



export const AdminAllUser = () => async (dispatch) => {
    dispatch({ type: ADMIN_ALL_USERS_REQUEST })

    await axios.get("https://foreverfashion.herokuapp.com/user/GetAllUser", { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: ADMIN_ALL_USERS_SUCCESS,
            payload: result.data.user
        })
    }).catch((err) => {
        dispatch({
            type: ADMIN_ALL_USERS_FAIL,
            payload: err.response.data
        })
    });
}


export const DeleteUser = (id) => async (dispatch) => {
    dispatch({ type: ADMIN_DELETE_USERS_REQUEST })

    await axios.delete(`https://foreverfashion.herokuapp.com/user/DeleteUser/${id}`, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: ADMIN_DELETE_USERS_SUCCESS,
            payload: result.data.success
        })
    }).catch((err) => {
        dispatch({
            type: ADMIN_DELETE_USERS_FAIL,
            payload: err.response.data
        })
    });
}


export const UpdateUserRole = (id, name, email, role) => async (dispatch) => {
    dispatch({ type: ADMIN_UPDATE_USERS_REQUEST })

    await axios.put(`https://foreverfashion.herokuapp.com/user/UpdateUserRole/${id}`, {
        name, email, role
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: ADMIN_UPDATE_USERS_SUCCESS,
            payload: result.data.success
        })
    }).catch((err) => {
        dispatch({
            type: ADMIN_UPDATE_USERS_FAIL,
            payload: err.response.data
        })
    });
}





export const getUserDetails = (id) => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST })

    await axios.get(`https://foreverfashion.herokuapp.com/user/GetSingleUser/${id}`, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: USER_DETAILS,
            payload: result.data.user
        })
    }).catch((err) => {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response.data
        })
    });
}





// GetSingleUser


export const GetSingleUser = (id) => async (dispatch) => {
    dispatch({ type: LOAD_USER_REQUEST })

    await axios.get(`https://foreverfashion.herokuapp.com/user/GetSingleUser/${id}`, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: LOAD_USER,
            payload: result.data.user
        })
    }).catch((err) => {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: err.response.data
        })
    });
}