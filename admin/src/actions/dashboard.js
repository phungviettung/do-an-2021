import { dashboard } from "../apis";
import * as type from "../const/ActionTypes";

export const fetchData = (timmer) => (dispatch) => {
    dispatch({ type: type.FETCH_DATA });
    dashboard
        .fetchData(timmer)
        .then((resp) => {
            console.log("resp: ", resp);
            dispatch({
                type: type.FETCH_DATA_SUCCESS,
                payload: { data: resp.data.data},
            });
        })
        .catch((err) => {
            console.log("err: ", err);
            dispatch({ type: type.FETCH_DATA_FAILED });
        });
};
