import { ALL_ORDER, ALL_ORDER_FAIL, ALL_ORDER_REQUEST, CREATE_NEW_ORDER, CREATE_NEW_ORDER_FAIL, CREATE_NEW_ORDER_REQUEST, DELETE_ORDER, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, MY_ORDER, MY_ORDER_FAIL, MY_ORDER_REQUEST, ORDER_DETAILS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, UPDATE_ORDER, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET } from "../Constants/constant";

const initialState = {
    order: []
}

export function OrderReducer(state = initialState, actions) {
    switch (actions.type) {

        case CREATE_NEW_ORDER_REQUEST:
        case MY_ORDER_REQUEST:
        case ALL_ORDER_REQUEST:
            return {
                loading: true
            }

        case CREATE_NEW_ORDER:
        case MY_ORDER:
        case ALL_ORDER:
            return {
                loading: false,
                order: actions.payload
            }
        case CREATE_NEW_ORDER_FAIL:
        case MY_ORDER_FAIL:
        case ALL_ORDER_FAIL:
            return {
                loading: false,
                error: actions.payload
            }

        default:
            return state

    }
}



export function OrderDetailReducer(state = { orderDetails: [] }, actions) {
    switch (actions.type) {

        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }

        case ORDER_DETAILS:
            return {
                loading: false,
                orderDetails: actions.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: actions.payload
            }

        default:
            return state

    }
}

export function DeleteUpdateOrderReducer(state = {}, actions) {
    switch (actions.type) {

        case DELETE_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                loading: true
            }

        case DELETE_ORDER:
            return {
                loading: false,
                isDeleted: actions.payload
            }
        case UPDATE_ORDER:
            return {
                loading: false,
                isUpdated: actions.payload
            }
        // isUpdated
        case DELETE_ORDER_FAIL:
        case UPDATE_ORDER_FAIL:
            return {
                loading: false,
                error: actions.payload
            }
        case DELETE_ORDER_RESET:
            return {
                isDeleted: false
            }
        case UPDATE_ORDER_RESET:
            return {
                isUpdated: false
            }
        default:
            return state

    }
}