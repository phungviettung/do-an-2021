import axios from "axios";

const BaseApi = process.env.REACT_APP_BASE_API;

export default {
    fetchProducts: (data) => axios({
                methor : 'get',
                url : `${BaseApi}/api/product?title=${data.key}&page=${data.current}&limit=${data.pageSize}&category=${data.category}&material=${data.material}`,
            }
    ),
    addProduct: (data) => axios.post(`${BaseApi}/api/product`, data),
    getProduct: (id) => axios({
        methor : 'get',
        url : `${BaseApi}/api/product/${id}`,
    }),
    updateProduct: (id, data) => axios.put(`${BaseApi}/api/product/${id}`, data)
};
