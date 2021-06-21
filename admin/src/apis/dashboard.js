import axios from "axios";

const BaseApi = process.env.REACT_APP_BASE_API;

export default {
    fetchData: (timmer) => axios({
                methor : 'get',
                url : `${BaseApi}/api/dashboard?timmer=${timmer}`,
            }
    )
};
