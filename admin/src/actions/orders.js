import { orders } from "../apis";
import * as type from "../const/ActionTypes";

export const fetchOrders = (data) => (dispatch) => {
    dispatch({ type: type.FETCH_ORDERS });
    orders
        .fetchOrders(data)
        .then((resp) => {
            console.log("resp: ", resp);
            dispatch({
                type: type.FETCH_ORDERS_SUCCESS,
                payload: { orders: resp.data.orders, total: resp.data.total },
            });
        })
        .catch((err) => {
            dispatch({ type: type.FETCH_ORDERS_FAILED });
        });
};

export const addOrder = (data) => (dispatch) => {
    dispatch({ type: type.ADD_ORDER });
    orders
        .addOrder(data)
        .then((resp) => {
            if (resp.data && resp.data.success && resp.data.msg) {
                dispatch({
                    type: type.ADD_ORDER_SUCCESS,
                    payload: {
                        message: resp.data.message,
                    },
                });
            } else {
                dispatch({
                    type: type.ADD_ORDER_FAILED,
                    payload: {
                        message: "Something went wrong!",
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add Order failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.ADD_ORDER_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const getOrder = (id) => (dispatch) => {
    dispatch({ type: type.GET_ORDER });
    orders
        .getOrder(id)
        .then((resp) => {
            if (resp.data && resp.data.success) {
                dispatch({
                    type: type.GET_ORDER_SUCCESS,
                    payload: {
                        order: resp.data.order,
                    },
                });
            } else {
                dispatch({
                    type: type.GET_ORDER_FAILED,
                    payload: {
                        message: "Something went wrong!",
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add Order failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.GET_ORDER_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const updateOrderDelivered = (id) => (dispatch) => {
    console.log('a')
    dispatch({ type: type.UPDATE_ORDER_DELIVER , payload: {
        message: '',
        result : {
            delivered : false 
        }
    },});
    console.log('b')
    orders
        .updateOrderDelivered(id)
        .then((resp) => {
            if (resp.data && resp.data.success) {
                console.log("🚀 ~ file: orders.js ~ line 98 ~ .then ~ resp", resp)
                dispatch({
                    type: type.UPDATE_ORDER_DELIVER_SUCCESS,
                    payload: {
                        message: resp.data.msg,
                        result : resp.data.result
                    },
                });
            } else {
                dispatch({
                    type: type.UPDATE_ORDER_DELIVER_FAILED,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Update deliver Order failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.UPDATE_ORDER_DELIVER_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const deleteOrder = (id) => {
    orders.deleteOrder(id)
    .then(res=> {
        console.log(res)
    })
}
