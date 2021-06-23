import axios from "axios";
import { deleteCategory } from "../actions/categories";

const BaseApi = process.env.REACT_APP_BASE_API;

export default {
    fetchCategories: () => axios({
                methor : 'get',
                url : `${BaseApi}/api/categories`,
            }
    ),
    addCategory: (data) => axios.post(`${BaseApi}/api/categories`, data),
    getCategory: (id) => axios({
        methor : 'get',
        url : `${BaseApi}/api/categories/${id}`,
    }),
    updateCategory : (id, data) => axios.put(`${BaseApi}/api/categories/${id}`, data),
    deleteCategory: (id) => axios.delete(`${BaseApi}/api/categories/${id}`),

};
