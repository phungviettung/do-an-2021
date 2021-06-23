import * as type from "../const/ActionTypes";
const initialState = {
    list: {
        products: [],
        total: 0,
        loading: false,
    },
    addProduct: {
        loading: false,
        success: false,
        message: "",
    },
    updateProduct: {
        loading: false,
        success: false,
        message: "",
    },
    deleteProduct: {
        loading: false,
        success: false,
        message: "",
    },
    getProduct: {
        id: "",
        loading: false,
        success: false,
        message: "",
    },
};

export default function productReduce(state = initialState, action = {}) {
    console.log("ACTION: ", action);
    switch (action.type) {
        case type.FETCH_PRODUCTS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            };
        case type.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    products: action.payload.products,
                    total: action.payload.total,
                },
            };
        case type.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    products: [],
                },
            };
        case type.ADD_PRODUCT:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    loading: true,
                    message: "",
                    success: false,
                },
            };
        case type.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                },
            };
        case type.ADD_PRODUCT_FAILED:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
        case type.GET_PRODUCT:
            return {
                ...state,
                getProduct: {
                    ...state.getProduct,
                    loading: true,
                    success: false,
                    message: "",
                },
            };
        case type.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                getProduct: {
                    ...state.getProduct,
                    loading: false,
                    product: action.payload.product,
                    message: "Get product success",
                    success: true,
                },
            };
        case type.GET_PRODUCT_FAILED:
            return {
                ...state,
                getProduct: {
                    ...state.getProduct,
                    loading: false,
                    message: "Get product failed",
                    success: false,
                },
            };
        case type.UPDATE_PRODUCT:
            return {
                ...state,
                updateProduct: {
                    ...state.updateProduct,
                    loading: true,
                    message: "",
                    success: false,
                },
            };
        case type.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                updateProduct: {
                    ...state.updateProduct,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                },
            };
        case type.UPDATE_PRODUCT_FAILED:
            return {
                ...state,
                updateProduct: {
                    ...state.updateProduct,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
            
        case type.DELETE_PRODUCT:
            return {
                ...state,
                deleteProduct: {
                    ...state.deleteProduct,
                    loading: true,
                    message: "",
                    success: false,
                },
            };
        case type.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleteProduct: {
                    ...state.deleteProduct,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                },
            };
        case type.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                deleteProduct: {
                    ...state.deleteProduct,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
    }
    return state;
}
