import * as type from "../const/ActionTypes";
const initialState = {
    list: {
        orders: [],
        total: 0,
        loading: false,
    },
    addOrder: {
        loading: false,
        success: false,
        message: "",
    },
    updateOrderDeliver: {
        loading: false,
        success: false,
        message: "",
        result : {}
    },
    getOrder: {
        id: "",
        loading: false,
        success: false,
        message: "",
    },
};

export default function orderReducer(state = initialState, action = {}) {
    console.log("ACTION: ", action);
    switch (action.type) {
        case type.FETCH_ORDERS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            };
        case type.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    orders: action.payload.orders,
                    total: action.payload.total,
                },
            };
        case type.FETCH_ORDERS_FAILED:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    orders: [],
                },
            };
        case type.ADD_ORDER:
            return {
                ...state,
                addOrder: {
                    ...state.addOrder,
                    loading: true,
                    message: "",
                    success: false,
                },
            };
        case type.ADD_ORDER_SUCCESS:
            return {
                ...state,
                addOrder: {
                    ...state.addOrder,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                },
            };
        case type.ADD_ORDER_FAILED:
            return {
                ...state,
                addOrder: {
                    ...state.addOrder,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
        case type.GET_ORDER:
            return {
                ...state,
                getOrder: {
                    ...state.getOrder,
                    loading: true,
                    success: false,
                    message: "",
                },
            };
        case type.GET_ORDER_SUCCESS:
            return {
                ...state,
                getOrder: {
                    ...state.getOrder,
                    loading: false,
                    order: action.payload.order,
                    message: "Get order success",
                    success: true,
                },
            };
        case type.GET_ORDER_FAILED:
            return {
                ...state,
                getOrder: {
                    ...state.getOrder,
                    loading: false,
                    message: "Get order failed",
                    success: false,
                },
            };
        case type.UPDATE_ORDER_DELIVER:
            return {
                ...state,
                updateOrderDeliver: {
                    ...state.updateOrderDeliver,
                    loading: true,
                    message: "",
                    success: false,
                    result : {}
                },
            };
        case type.UPDATE_ORDER_DELIVER_SUCCESS:
            return {
                ...state,
                updateOrderDeliver: {
                    ...state.updateOrderDeliver,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                    result :{
                        ...state.updateOrderDeliver.result,
                        result : action.payload.result
                    }
                },
            };
        case type.UPDATE_ORDER_DELIVER_FAILED:
            return {
                ...state,
                updateOrderDeliver: {
                    ...state.updateOrderDeliver,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
    }
    return state;
}
