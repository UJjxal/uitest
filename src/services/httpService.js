import axios from "axios";
import util from '../utilities/util';

axios.interceptors.response.use(
  request => {
    const token = util.getToken();
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
    }else{
      delete axios.defaults.headers.common["Authorization"];
    }

    return request;
  },

  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

      let elem = document.querySelector('.login-card');
      error.response?.status === 403 && elem && elem.classList.remove('d-none');

    if (!expectedError) {
      console.log(error);
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
