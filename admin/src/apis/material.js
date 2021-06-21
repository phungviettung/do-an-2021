import axios from "axios";

const BaseApi = process.env.REACT_APP_BASE_API;

export default {
    fetchMaterial: () => axios({
                methor : 'get',
                url : `${BaseApi}/api/material`,
            }
    ),
    addMaterial: (data) => axios.post(`${BaseApi}/api/material`, data),
    getMaterial: (id) => axios({
        methor : 'get',
        url : `${BaseApi}/api/material/${id}`,
    }),
    updateMaterial : (id, data) => axios.put(`${BaseApi}/api/material/${id}`, data)
};
