import { material } from "../apis";
import * as type from "../const/ActionTypes";

export const fetchMaterial = () => (dispatch) => {
    dispatch({ type: type.FETCH_MATERIAL });
    material 
        .fetchMaterial()
        .then((resp) => {
            console.log("resp Materialyyy: ", resp);
            dispatch({
                type: type.FETCH_MATERIAL_SUCCESS,
                payload: { material: resp.data.material, total: resp.data.total },
            });
        })
        .catch((err) => {
            dispatch({ type: type.FETCH_MATERIAL_FAILED });
        });
};

export const addMaterial = (data) => (dispatch) => {
    dispatch({ type: type.ADD_MATERIAL });
    material
        .addMaterial(data)
        .then((resp) => {
            if (resp.data && resp.data.success && resp.data.msg) {
                dispatch({
                    type: type.ADD_MATERIAL_SUCCESS,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            } else {
                dispatch({
                    type: type.ADD_MATERIAL_FAILED,
                    payload: {
                        message: "Something went wrong!",
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add Material failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.ADD_MATERIAL_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const getMaterial = (id) => (dispatch) => {
    dispatch({ type: type.GET_MATERIAL });
    material
        .getMaterial(id)
        .then((resp) => {
            if (resp.data && resp.data.success) {
                dispatch({
                    type: type.GET_MATERIAL_SUCCESS,
                    payload: {
                        material: resp.data.material,
                    },
                });
            } else {
                dispatch({
                    type: type.GET_MATERIAL_FAILED,
                    payload: {
                        message: "Something went wrong!",
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "Add Material failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.GET_MATERIAL_FAILED,
                payload: {
                    message,
                },
            });
        });
};

export const updateMaterial = (id, data) => (dispatch) => {
    console.log('his')
    dispatch({ type: type.UPDATE_MATERIAL });
    material
        .updateMaterial(id, data)
        .then((resp) => {
            if (resp.data && resp.data.success) {
                dispatch({
                    type: type.UPDATE_MATERIAL_SUCCESS,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            } else {
                dispatch({
                    type: type.UPDATE_MATERIAL_FAILED,
                    payload: {
                        message: resp.data.msg,
                    },
                });
            }
        })
        .catch((err) => {
            console.log("err: ", err.response);
            let message = "upload Material failed";
            if (err.response && err.response.statusText) {
                message = err.response.statusText;
            }
            dispatch({
                type: type.UPDATE_MATERIAL_FAILED,
                payload: {
                    message,
                },
            });
        });
};
