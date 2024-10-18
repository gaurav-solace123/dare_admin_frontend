// Import serviceV1 wherever you need to make API calls
import serviceV1 from "./base"; // Adjust the import path as needed
import Config from "../config/config.json";

// Example usage in a component or module
export const getData = async (apiName, data) => {
  try {
    if (Config.isMock) {
      return await serviceV1.get(`${Config.base_url}${apiName}.json`, data);
    } else {
      return await serviceV1.get(`${Config.backend.baseurl}${apiName}`);
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle error if needed
  }
};

// Example usage in a component or module
export const postData = async (apiName, data) => {
  try {
    if (Config.isMock) {
      return await serviceV1.post(
        `${Config.base_url}${apiName}.json`,
        data
      );
      // Return a Promise that resolves with the mock response
    } else {
      // Make a POST request to send data

      return await serviceV1.post(
        `${Config.backend.baseurl}${apiName}`,
        data
      );
      // Handle the response
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle error if needed
  }
};

// Example usage in a component or module
export const updateData = async (apiName, data) => {
  try {
    if (Config.isMock) {
      return await serviceV1.put(`${Config.base_url}${apiName}.json`, data);
    } else {
      // Make a PUT request to update data
      return await serviceV1.put(`${Config.backend.baseurl}${apiName}`, data);
    }
    // Handle the response
  } catch (error) {
    console.error("Error:", error);
    // Handle error if needed
  }
};
export const patchData = async (apiName, data) => {
  try {
    if (Config.isMock) {
      return await serviceV1.patch(`${Config.base_url}${apiName}.json`, data);
    } else {
      // Make a PUT request to update data
      return await serviceV1.patch(`${Config.backend.baseurl}${apiName}`, data);
    }
    // Handle the response
  } catch (error) {
    console.error("Error:", error);
    // Handle error if needed
  }
};

// Example usage in a component or module
export const deleteData = async (apiName, data) => {
  try {
    if (Config.isMock) {
      return await serviceV1.delete(`${Config.base_url}${apiName}.json`, data);
    } else {
      // Make a DELETE request to delete data
      return await serviceV1.delete(`${Config.backend.baseurl}${apiName}`, {
        data: data,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle error if needed
  }
};
