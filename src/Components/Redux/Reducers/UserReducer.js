import { LOGIN_USER, LOGIN_USER_FAIL, LOGOUT_USER, LOGOUT_USER_FAIL, REGISTER_USER, REGISTER_USER_FAIL, FORGOT_PASSWORD_EMAIL, FORGOT_PASSWORD_EMAIL_FAIL, REGISTER_USER_REQUEST, LOGIN_USER_REQUEST, LOAD_USER_REQUEST, LOAD_USER, LOAD_USER_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PASSWORD, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET, FORGOT_PASSWORD_EMAIL_REQUEST, FORGOT_PASSWORD_EMAIL_RESET, RESET_PASSWORD_EMAIL_REQUEST, RESET_PASSWORD_EMAIL, RESET_PASSWORD_EMAIL_FAIL, RESET_PASSWORD_EMAIL_RESET, ADMIN_ALL_USERS_REQUEST, ADMIN_ALL_USERS_SUCCESS, ADMIN_ALL_USERS_FAIL, ADMIN_DELETE_USERS_REQUEST, ADMIN_DELETE_USERS_SUCCESS, ADMIN_DELETE_USERS_FAIL, ADMIN_DELETE_USERS_RESET, ADMIN_UPDATE_USERS_RESET, ADMIN_UPDATE_USERS_FAIL, ADMIN_UPDATE_USERS_REQUEST, ADMIN_UPDATE_USERS_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS, USER_DETAILS_FAIL } from "../Constants/constant";


const initialState = {
    user: {},
    error: [],
    message: {}
}


export default function AuthReduers(state = initialState, actions) {
    switch (actions.type) {

        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case LOAD_USER_REQUEST:
        case FORGOT_PASSWORD_EMAIL_REQUEST:
            return {
                loading: true
            }

        case LOGIN_USER:
        case REGISTER_USER:
        case LOAD_USER:
            return {
                // ...state,
                loading: false,
                isAuthenticated: true,
                user: actions.payload
            }


        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,

            }


        case REGISTER_USER_FAIL:
        case LOGIN_USER_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: actions.payload
            }

        case LOAD_USER_FAIL:
            return {
                isAuthenticated: false,
                loading: false,
                user: null,
                error: actions.payload
            }

        case LOGOUT_USER_FAIL:
            return {
                error: actions.payload,
                loading: false,
            }


        case FORGOT_PASSWORD_EMAIL:
            return {
                message: actions.payload
            }

        case FORGOT_PASSWORD_EMAIL_FAIL:
            return {
                error: actions.payload
            }

        case FORGOT_PASSWORD_EMAIL_RESET:
            return {
                message: false
            }


        default:
            return state
    }
}


export function ProfileReduers(state = {}, actions) {
    switch (actions.type) {

        case UPDATE_PROFILE_REQUEST:
            return {
                loading: true
            }

        case UPDATE_PROFILE:
            return {
                loading: false,
                isUpdated: actions.payload
            }

        case UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: actions.payload
            }

        case UPDATE_PROFILE_RESET:
            return {
                loading: false,
                isUpdated: false
            }

        default:
            return state
    }
}


export function UpdatePasswordReduers(state = {}, actions) {
    switch (actions.type) {

        case UPDATE_PASSWORD_REQUEST:
        case RESET_PASSWORD_EMAIL_REQUEST:
            return {
                loading: true
            }

        case UPDATE_PASSWORD:
        case RESET_PASSWORD_EMAIL:
            return {
                loading: false,
                isUpdated: actions.payload
            }

        case UPDATE_PASSWORD_FAIL:
        case RESET_PASSWORD_EMAIL_FAIL:
            return {
                loading: false,
                error: actions.payload
            }

        case UPDATE_PASSWORD_RESET:
        case RESET_PASSWORD_EMAIL_RESET:
            return {
                loading: false,
                isUpdated: false
            }

        default:
            return state
    }
}


export function GetAllUser(state = { users: [] }, actions) {
    switch (actions.type) {
        case ADMIN_ALL_USERS_REQUEST:
            return {
                loading: true
            }
        case ADMIN_ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: actions.payload
            }
        case ADMIN_ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: actions.payload
            }
        default:
            return state
    }
}


export function DeleteUpdateUser(state = { users: [] }, actions) {
    switch (actions.type) {
        case ADMIN_DELETE_USERS_REQUEST:
        case ADMIN_UPDATE_USERS_REQUEST:
            return {
                loading: true
            }
        case ADMIN_DELETE_USERS_SUCCESS:
            return {
                loading: false,
                isDeleted: actions.payload
            }

        case ADMIN_UPDATE_USERS_SUCCESS:
            return {
                loading: false,
                isUpdated: actions.payload
            }


        case ADMIN_DELETE_USERS_FAIL:
        case ADMIN_UPDATE_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: actions.payload
            }
        case ADMIN_DELETE_USERS_RESET:
        case ADMIN_UPDATE_USERS_RESET:
            return {
                ...state,
                isDeleted: false,
                isUpdated: false
            }

        default:
            return state
    }
}




export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DETAILS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };



        default:
            return state;
    }
};