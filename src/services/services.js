// Import serviceV1 wherever you need to make API calls
import serviceV1 from "./base"; // Adjust the import path as needed
import Config from "@/src/config/config.json";

// Example usage in a component or module
export const getData = async (apiName) => {
  try {
    if (Config.isMock) {
      let resp = require(`../mock/${apiName}.json`);
      return resp;
    } else {
      const response = await serviceV1.get(
        `${Config.backend.baseurl}${apiName}`
      );
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle error if needed
  }
};

// Example usage in a component or module
export const postData = async (apiName, postData) => {
  try {
    if (Config.isMock) {
      let resp = require(`../mock/${apiName}.json`);
      // Return a Promise that resolves with the mock response
      return resp;
    } else {
      // Make a POST request to send data
      const response = await serviceV1.post(
        `${Config.backend.baseurl}${apiName}`,
        postData
      );
      return response;
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
      let resp = require(`../mock/${apiName}.json`);
      // Return a Promise that resolves with the mock response
      return resp;
    } else {
      // Make a PUT request to update data
      const response = await serviceV1.put(
        `${Config.backend.baseurl}${apiName}`,
        data
      );
      return response;
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
      let resp = require(`../mock/${apiName}.json`);
      // Return a Promise that resolves with the mock response
      return resp;
    } else {
      // Make a PUT request to update data
      const response = await serviceV1.patch(
        `${Config.backend.baseurl}${apiName}`,
        data
      );
      return response;
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
      let resp = require(`../mock/${apiName}.json`);
      // Return a Promise that resolves with the mock response
      return resp;
    } else {
      // Make a DELETE request to delete data
      const response = await serviceV1.delete(
        `${Config.backend.baseurl}${apiName}`,
        {
          data:data
        }
      );
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle error if needed
  }
};
