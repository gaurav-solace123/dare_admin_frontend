import axios from "axios";
import configs from "../../config/config.json";
import commonFunc from "../../utils/common";

const serviceConfig = {
  timeout: 45000,
};

const getServiceInstance = (baseURL) => {
  const serviceInstance = axios.create({
    ...serviceConfig,
    ...{
      baseURL,
    },
  });

  serviceInstance.CancelToken = axios.CancelToken;
  serviceInstance.isCancel = axios.isCancel;

  serviceInstance.interceptors.request.use(async (config) => {
    const token = commonFunc.getDecodedValue('token'); // Get and decode token
    const modifiedConfig = {
        ...config,
    };

    if (config.url.indexOf("adminConfigs") > -1 || config.url.indexOf('superAdmin') > -1) {
        modifiedConfig.headers["Authorization"] = `gxczMcoDRtr9Qv9bgLkfjTZHNjZqcOuU95Q06O5lEurYzzql2AUkBrPvBT0r5sj5modLHZBQ7jHljae3PYT1Ry43gKIPQstB`;
    } else {
        if (token) {
            modifiedConfig.headers["Authorization"] = `Bearer ${token}`; // Use the decoded token directly
        } else {
            console.error("Token is null or undefined."); // Log if token is not retrieved correctly
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
export const serviceV1 = getServiceInstance(configs.backend.baseurl);

export default serviceV1;
