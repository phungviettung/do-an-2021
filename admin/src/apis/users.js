import axios from "axios";
import { getToken } from "../utils/localStorageHandler";

const BaseApi = process.env.REACT_APP_BASE_API;

// const config = {
//     headers: {
//         Authorization: `Bearer ${getToken()}`,
//     },
// };

export default {
    fetchUsers: (data) => axios({
                methor : 'get',
                url : `${BaseApi}/api/user?key=${data.key}&page=${data.current}&pageSize=${data.pageSize}`,
            }
        ),
    addUser: (data) => axios.post(`${BaseApi}/api/users/add`, data),
    // getUser: (id) => axios.get(`${BaseApi}/api/users/get?id=${id}`),
    getUser: (id) => axios({
        methor : 'get',
        url : `${BaseApi}/api/user/${id}`,
    })
};
