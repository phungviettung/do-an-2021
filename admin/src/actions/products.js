import { products } from "../apis";
import * as type from "../const/ActionTypes";

export const fetchProducts = (data) => (dispatch) => {
    dispatch({ type: type.FETCH_PRODUCTS });
    products
        .fetchProducts(data)
        .then((resp) => {
            console.log("resp: ", resp);
            dispatch({
                type: type.FETCH_PRODUCTS_SUCCESS,
                payload: { products: resp.data.products, total: resp.data.total },
            });
        })
        .catch((err) => {
            dispatch({ type: type.FETCH_PRODUCTS_FAILED });
        });
};

export const addProduct = (data) => (dispatch) => {
    dispatch({ type: type.ADD_PRODUCT });
    products
        .addProduct(data)
        .then((resp) => {
            if (resp.data && resp.data.success && resp.data.msg) {
                dispatch({
                    type: type.ADD_PRODUCT_SUCCESS,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            } else {
                dispatch({
                    type: type.ADD_PRODUCT_FAILED,
                    payload: {
                        message: "Something went wrong!",
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add product failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.ADD_PRODUCT_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const getProduct = (id) => (dispatch) => {
    dispatch({ type: type.GET_PRODUCT });
    products
        .getProduct(id)
        .then((resp) => {
            if (resp.data && resp.data.success) {
                dispatch({
                    type: type.GET_PRODUCT_SUCCESS,
                    payload: {
                        product: resp.data.product,
                    },
                });
            } else {
                dispatch({
                    type: type.GET_PRODUCT_FAILED,
                    payload: {
                        message: "Something went wrong!",
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add product failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.GET_PRODUCT_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const updateProduct = (id, data) => (dispatch) => {
    dispatch({ type: type.UPDATE_PRODUCT });
    products
        .updateProduct(id, data)
        .then((resp) => {
            if (resp.data && resp.data.success) {
                dispatch({
                    type: type.UPDATE_PRODUCT_SUCCESS,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            } else {
                dispatch({
                    type: type.UPDATE_PRODUCT_FAILED,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add product failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.UPDATE_PRODUCT_FAILED,
                payload: {
                    message,
                },
            });
        });
};
