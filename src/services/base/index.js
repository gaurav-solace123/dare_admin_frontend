import axios from "axios";
// Importing config from a JSON file
import config from "../../config/config.json";
// import { getSession } from "next-auth/react";
// import useSession from "@/src/hooks/useSession";
// import Cookies from "js-cookie";

const serviceConfig = {
  timeout: 45000,
};

const getServiceInstance = (baseURL) => {
  // If not in mock mode, create a regular Axios instance
  const serviceInstance = axios.create({
    ...serviceConfig,
    ...{
      baseURL,
    },
  });

  serviceInstance.CancelToken = axios.CancelToken;
  serviceInstance.isCancel = axios.isCancel;

  serviceInstance.interceptors.request.use(async (config) => {
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM4MjIzODYxYmE0NmI0ZGMyMTk0ZTgiLCJlbWFpbCI6InN1cGVyYWRtaW5AZGFyZS5jb20iLCJfX3YiOjAsImlhdCI6MTcyNDY3NTA3MiwiZXhwIjoxNzI1Mjc5ODcyfQ.uN8Uy111_d8Wo0noNcdam6JpWOH5THsPcTseyCIq1zY'
    console.log("sessionfromAPi",token)
    const modifiedConfig = {
      ...config,
    };
    if(config.url.indexOf("adminConfigs") > -1 ||  config.url.indexOf('superAdmin') > -1){
      modifiedConfig.headers["Authorization"] = `gxczMcoDRtr9Qv9bgLkfjTZHNjZqcOuU95Q06O5lEurYzzql2AUkBrPvBT0r5sj5modLHZBQ7jHljae3PYT1Ry43gKIPQstB`;
     }else{
      if (token) {
        // modifiedConfig.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
        modifiedConfig.headers["Authorization"] = `Bearer ${token}`;
      }
     }
    return modifiedConfig;
  });

  serviceInstance.interceptors.response.use(
    (response) => {
      if (response.status == 200) {
        return response.data;
      }
      return [];
    },
    (error) => {
      return error;
    }
  );
  return serviceInstance;
};

// Assuming BASE_URL is imported from somewhere else
// You might need to adjust this depending on your project structure
export const serviceV1 = getServiceInstance(config.backend.baseurl);

export default serviceV1;
