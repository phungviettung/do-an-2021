import * as type from "../const/ActionTypes";
const initialState = {
    list: {
        categories: [],
        total: 0,
        loading: false,
    },
    addCategory: {
        loading: false,
        success: false,
        message: "",
    },
    updateCategory: {
        loading: false,
        success: false,
        message: "",
    },
    getCategory: {
        id: "",
        loading: false,
        success: false,
        message: "",
    },
};

export default function categoryReduce(state = initialState, action = {}) {
    console.log("ACTION: ", action);
    switch (action.type) {
        case type.FETCH_CATEGORIES:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            };
        case type.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    categories: action.payload.categories,
                    total: action.payload.total,
                },
            };
        case type.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    categories: [],
                },
            };
        case type.ADD_CATEGORY:
            return {
                ...state,
                addCategory: {
                    ...state.addCategory,
                    loading: true,
                    message: "",
                    success: false,
                },
            };
        case type.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                addCategory: {
                    ...state.addCategory,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                },
            };
        case type.ADD_CATEGORY_FAILED:
            return {
                ...state,
                addCategory: {
                    ...state.addCategory,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
        case type.GET_CATEGORY:
            return {
                ...state,
                getCategory: {
                    ...state.getCategory,
                    loading: true,
                    success: false,
                    message: "",
                },
            };
        case type.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                getCategory: {
                    ...state.getCategory,
                    loading: false,
                    category: action.payload.category,
                    message: "Get category success",
                    success: true,
                },
            };
        case type.GET_CATEGORY_FAILED:
            return {
                ...state,
                getCategory: {
                    ...state.getCategory,
                    loading: false,
                    message: "Get category failed",
                    success: false,
                },
            };
        case type.UPDATE_CATEGORY:
            return {
                ...state,
                updateCategory: {
                    ...state.updateCategory,
                    loading: true,
                    message: "",
                    success: false,
                },
            };
        case type.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                updateCategory: {
                    ...state.updateCategory,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                },
            };
        case type.UPDATE_CATEGORY_FAILED:
            return {
                ...state,
                updateCategory: {
                    ...state.updateCategory,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
        
    }
    return state;
}
