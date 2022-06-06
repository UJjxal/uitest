import axios from 'axios';
import util from '../utilities/util';
import { API_ROOT } from "../config";


class tableauService{
getTableauToken(data){
    const token = util.getToken();
    return axios({
        method: `GET`,
        url: API_ROOT + `tableau/token/`,
        data,
        headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*",  }
    })
}
}

export default new tableauService();