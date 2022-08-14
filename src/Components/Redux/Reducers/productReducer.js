import {
    ADD_REVIEW_FAIL, ADD_REVIEW_SUCCESS, ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS,
    CREATE_NEW_PRODUCT_REQUEST, CREATE_NEW_PRODUCT_SUCCESS, CREATE_NEW_PRODUCT_FAIL, CREATE_NEW_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, DELETE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, DELETE_PRODUCT_RESET

} from "../Constants/constant";

const initialState = {
    products: [],
    error: {},
    productReview: {}
}

export function ProdutReducer(state = initialState, actions) {
    switch (actions.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: actions.payload.products,
                productsCount: actions.payload.productsCount,
                resultPerPage: actions.payload.resultPerPage,
                filteredProductCount: actions.payload.filteredProductCount
            }

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: actions.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case ADD_REVIEW_SUCCESS:
            return {
                productReview: actions.payload
            }

        case ADD_REVIEW_FAIL:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}




const initialStates = {
    product: {},
    error: {}
}

export function ProdutDetailReducer(state = initialStates, actions) {
    switch (actions.type) {
        case PRODUCT_DETAIL_REQUEST:

            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: actions.payload.product,
            }

        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: actions.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}




export function NewProdutReducer(state = initialStates, actions) {
    switch (actions.type) {
        case CREATE_NEW_PRODUCT_REQUEST:

            return {
                loading: true,
                ...state
            }
        case CREATE_NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: actions.payload.product,
                success: actions.payload.success
            }

        case CREATE_NEW_PRODUCT_FAIL:
            return {
                loading: false,
                success: false,
                error: actions.payload
            }
        case CREATE_NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
                loading: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}









export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        default:
            return state;
    }
};
