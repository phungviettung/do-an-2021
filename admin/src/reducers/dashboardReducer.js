import * as type from "../const/ActionTypes";
const initialState = {
    list: {
        current : {
            totalOrder : 1,
            totalShipping : 1,
            totalIncome : 1,
            totalUser : 1
        },
        pre : {
            totalOrder : 1,
            totalShipping : 1,
            totalIncome : 1,
            totalUser : 1
        },
        chart : {
            label : [],
            data : []
        },
        chart2 : {
            label : [],
            data : []
        },
       loading : false
    }
};

export default function dashboardReducer(state = initialState, action = {}) {
    console.log("ACTION: ", action);
    switch (action.type) {
        case type.FETCH_DATA:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            };
        case type.FETCH_DATA_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    current : {
                        ...state.list.current,
                        totalOrder : action.payload.data.current.totalOrder,
                        totalShipping : action.payload.data.current.totalShipping,
                        totalIncome : action.payload.data.current.totalIncome,
                        totalUser : action.payload.data.current.totalUser
                    },
                    pre : {
                        ...state.list.pre,
                        totalOrder : action.payload.data.pre.totalOrder,
                        totalShipping : action.payload.data.pre.totalShipping,
                        totalIncome : action.payload.data.pre.totalIncome,
                        totalUser : action.payload.data.pre.totalUser
                    },
                    chart : {
                        ...state.list.chart,
                        data : action.payload.data.chart.data,
                        label : action.payload.data.chart.label
                    },
                    chart2 : {
                        ...state.list.chart2,
                        data : action.payload.data.chart2.data,
                        label : action.payload.data.chart2.label
                    },
                    loading: false,
                },
            };
        case type.FETCH_DATA_FAILED:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                },
            };
    }
    return state;
}
