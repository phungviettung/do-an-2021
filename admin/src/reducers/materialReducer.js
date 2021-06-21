import * as type from "../const/ActionTypes";
const initialState = {
    list: {
        material: [],
        total: 0,
        loading: false,
    },
    addMaterial: {
        loading: false,
        success: false,
        message: "",
    },
    updateMaterial: {
        loading: false,
        success: false,
        message: "",
    },
    getMaterial: {
        id: "",
        loading: false,
        success: false,
        message: "",
    },
};

export default function materialReduce(state = initialState, action = {}) {
    console.log("ACTION: ", action);
    switch (action.type) {
        case type.FETCH_MATERIAL:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            };
        case type.FETCH_MATERIAL_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    material: action.payload.material,
                    total: action.payload.total,
                },
            };
        case type.FETCH_MATERIAL_FAILED:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    material: [],
                },
            };
        case type.ADD_MATERIAL:
            return {
                ...state,
                addMaterial: {
                    ...state.addMaterial,
                    loading: true,
                    message: "",
                    success: false,
                },
            };
        case type.ADD_MATERIAL_SUCCESS:
            return {
                ...state,
                addMaterial: {
                    ...state.addMaterial,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                },
            };
        case type.ADD_MATERIAL_FAILED:
            return {
                ...state,
                addMaterial: {
                    ...state.addMaterial,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
        case type.GET_MATERIAL:
            return {
                ...state,
                getMaterial: {
                    ...state.getMaterial,
                    loading: true,
                    success: false,
                    message: "",
                },
            };
        case type.GET_MATERIAL_SUCCESS:
            return {
                ...state,
                getMaterial: {
                    ...state.getMaterial,
                    loading: false,
                    material: action.payload.material,
                    message: "Get material success",
                    success: true,
                },
            };
        case type.GET_MATERIAL_FAILED:
            return {
                ...state,
                getMaterial: {
                    ...state.getMaterial,
                    loading: false,
                    message: "Get material failed",
                    success: false,
                },
            };
        case type.UPDATE_MATERIAL:
            return {
                ...state,
                updateMaterial: {
                    ...state.updateMaterial,
                    loading: true,
                    message: "",
                    success: false,
                },
            };
        case type.UPDATE_MATERIAL_SUCCESS:
            return {
                ...state,
                updateMaterial: {
                    ...state.updateMaterial,
                    loading: false,
                    message: action.payload.message,
                    success: true,
                },
            };
        case type.UPDATE_MATERIAL_FAILED:
            return {
                ...state,
                updateMaterial: {
                    ...state.updateMaterial,
                    loading: false,
                    message: action.payload.message,
                    success: false,
                },
            };
        
    }
    return state;
}
