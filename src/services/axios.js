import axios from "axios";

import { getToken, removeToken } from "@utils/commonFunctions";

// baseURL: "https://web8.anasource.com/team4/eatroutes-api/api",
const API = axios.create({
  // baseURL: "https://admin.eatroutes.com/api",     ///Production
  baseURL: "https://stag.eatroutes.com/api",        ///Staging

});

API.interceptors.request.use(
  function (config) {
    let token = getToken();
    config.headers['Access-Control-Allow-Origin'] = '*'
    if(token){

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
        removeToken();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
