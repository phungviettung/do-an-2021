import axios from "axios";

const BaseApi = process.env.REACT_APP_BASE_API;

export default {
    fetchOrders: (data) => axios({
                methor : 'get',
                url : `${BaseApi}/api/order`,
            }
    ),
    addOrder: (data) => axios.post(`${BaseApi}/api/order`, data),
    getOrder: (id) => axios({
        methor : 'get',
        url : `${BaseApi}/api/order/${id}`,
    }),
    updateOrderDelivered: (id) => axios({
        url : `${BaseApi}/api/order/delivered/${id}`,
        method : 'patch'
    })
};
