import { categories } from "../apis";
import * as type from "../const/ActionTypes";

export const fetchCategories = () => (dispatch) => {
    dispatch({ type: type.FETCH_CATEGORIES });
    categories 
        .fetchCategories()
        .then((resp) => {
            console.log("resp categoryyyy: ", resp);
            dispatch({
                type: type.FETCH_CATEGORIES_SUCCESS,
                payload: { categories: resp.data.categories, total: resp.data.total },
            });
        })
        .catch((err) => {
            dispatch({ type: type.FETCH_CATEGORIES_FAILED });
        });
};

export const addCategory = (data) => (dispatch) => {
    dispatch({ type: type.ADD_CATEGORY });
    categories
        .addCategory(data)
        .then((resp) => {
            if (resp.data && resp.data.success && resp.data.msg) {
                dispatch({
                    type: type.ADD_CATEGORY_SUCCESS,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            } else {
                dispatch({
                    type: type.ADD_CATEGORY_FAILED,
                    payload: {
                        message: "Something went wrong!",
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add category failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.ADD_CATEGORY_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const getCategory = (id) => (dispatch) => {
    dispatch({ type: type.GET_CATEGORY });
    categories
        .getCategory(id)
        .then((resp) => {
            if (resp.data && resp.data.success) {
                dispatch({
                    type: type.GET_CATEGORY_SUCCESS,
                    payload: {
                        category: resp.data.category,
                    },
                });
            } else {
                dispatch({
                    type: type.GET_CATEGORY_FAILED,
                    payload: {
                        message: "Something went wrong!",
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add category failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.GET_CATEGORY_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const updateCategory = (id, data) => (dispatch) => {
    console.log('his')
    dispatch({ type: type.UPDATE_CATEGORY });
    categories
        .updateCategory(id, data)
        .then((resp) => {
            if (resp.data && resp.data.success) {
                dispatch({
                    type: type.UPDATE_CATEGORY_SUCCESS,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            } else {
                dispatch({
                    type: type.UPDATE_CATEGORY_FAILED,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "upload category failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.UPDATE_CATEGORY_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const deleteCategory = (id) => {
    categories.deleteCategory(id)
        .then((resp) => {
            return resp
        })
    }
