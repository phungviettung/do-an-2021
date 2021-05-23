import axios from "axios";

export default {
    // login: (data) => axios.post("http://localhost:3000/api/auth/login", data),
    login: (data, token) => axios({
        method: 'post',
        url: "http://localhost:3000/api/auth/login",
        data,
        headers: {
           'Authorization': `${token}`
        }
    }),
    logout: () => {},
    register: () => {},
};
