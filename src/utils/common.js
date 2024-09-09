import { format, parseISO, parse } from "date-fns";
import { saveAs } from 'file-saver';
const commonFunc = {
  getHeaders: () => {
    return {
      "Content-Type": "application/json",
    };
  },
  getClassName: (...params) => {
    return [...params].join(" ");
  },
  formatWithLocale: (date, formatStr) => {
    if(date){
      return format(date, formatStr);
    }else{
      return ""
    }
  },
  getLocalImagePath: (imgName) => {
    return `/assets/images/${imgName}`;
  },
  getLocationIcons: (imgName) => {
    return `/assets/images/pin_big/${imgName}`;
  },
  getPriceRoundOf: (param) => {
    return param;
    // return param.toLocaleString('en-IN', { maximumFractionDigits: 2, currency: 'INR' });
  },
  getAddress: (street, postalCode, city, province, region) => {
    const addressComponents = [];

    // Check each parameter and add it to the array if it meets the criteria
    if (street) {
      addressComponents.push(street);
    }
    if (postalCode) {
      addressComponents.push(postalCode);
    }
    if (city) {
      addressComponents.push(city);
    }
    if (province) {
      addressComponents.push(province);
    }
    if (region) {
      addressComponents.push(region);
    }

    return addressComponents.join(", ");
  },
  combineDateAndTime: (date, time) => {
    // Parse the date and time strings
    const dateParsed = parseISO(date);
    const timeParsed = parse(time, "HH:mm:ss", new Date());

    // Combine date and time
    const combinedDateTime = new Date(dateParsed);
    combinedDateTime.setHours(
      timeParsed.getHours(),
      timeParsed.getMinutes(),
      timeParsed.getSeconds()
    );
    return combinedDateTime;
  },
  getUserName: (firstName, lastName, id) => {
    if (firstName !== null && lastName !== null) {
      return `${firstName + " " + lastName} `;
    } else {
      return `User-${id}`;
    }
  },
  getIslandPlaceholder: () => {
    return commonFunc.getLocalImagePath("islandPlaceholder.svg");
  },
  getIslanderPlaceholder: () => {
    return commonFunc.getLocalImagePath("user_placeholder.svg");
  },
  getSelectedIslandData: () => {
    const selectdIslandData = localStorage.getItem("islandData");
    if (selectdIslandData !== null) {
      const parseData = JSON.parse(selectdIslandData);
      return parseData;
    }
  },
  getArchipelagoPlaceholder: () => {
    return commonFunc.getLocalImagePath("archipelago_placeholder.svg");
  },
  formatKeyName: (key) => {
    return (
      key
        // Insert a space before each capital letter (except the first one)
        .replace(/([A-Z])/g, " $1")
        // Trim leading space and capitalize the first letter of each word
        .replace(/^./, (str) => str.toUpperCase())
        .trim()
    );
  },
  isImageUrl(url) {
    const imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];
    const extension = url.split(".").pop().toLowerCase();
    return imageExtensions.includes(extension);
  },
  getFileName(url) {
    const parts = url.split("/");
    const fileName = parts.pop().split("#")[0].split("?")[0];
    return fileName;
  },
  CheckAllIsland() {
    const pathnameVal = window.location.pathname.split("/");
    if (pathnameVal && pathnameVal.length > 1) {
      if (pathnameVal[1] === "All_ISLAND") {
        return true;
      } else {
        return false;
      }
    }
  },
  getSelectedIslandData: () => {
    const selectdIslandData = localStorage.getItem("islandData");
    if (selectdIslandData !== null) {
      const parseData = JSON.parse(selectdIslandData);
      return parseData;
    }
  },
  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  getUserData: () => {
    const userData = localStorage.getItem("userData");
    if (userData !== null) {
      const parseData = JSON.parse(userData);
      return parseData;
    }
  },
  deleteCookie(name) {
    document.cookie =
      name + "=; Max-Age=0; path=/; domain=" + window.location.hostname;
  },

  determineOutcome: (from, to) => {
    // Helper function to determine the range string for a single value
    function getRange(value) {
      if (value > 50) {
        return "Over 50";
      } else if (value >= 36) {
        return "36-50";
      } else if (value >= 18) {
        return "18-35";
      } else if (value >= 1) {
        return "1-17";
      } else {
        return "Invalid"; // Handle unexpected values
      }
    }

    // If both are null, return "Invalid"
    if (from === null && to === null) {
      return "Invalid";
    }

    // If only one of them is null, use the non-null value
    if (from === null) {
      return getRange(to);
    }
    if (to === null) {
      return getRange(from);
    }

    // If both are not null, determine the range that covers both
    let minValue = Math.min(from, to);
    let maxValue = Math.max(from, to);

    if (maxValue > 50) {
      return "over 50";
    } else if (maxValue >= 36) {
      return "36-50";
    } else if (maxValue >= 18) {
      return "18-35";
    } else if (maxValue >= 1) {
      return "1-17";
    } else {
      return "Invalid"; // Handle unexpected values
    }
  },
  isNonNull(prop) {
    return prop !== null && prop !== undefined;
  },
  filterNonEmptyFields(arr) {
    return arr
      .map((obj) => {
        let newObj = {};
        for (let key in obj) {
          if (obj[key] !== "") {
            newObj[key] = obj[key];
          }
        }
        return newObj;
      })
      .filter((obj) => Object.keys(obj).length > 0);
  },
  getDarkIcon(imgName) {
    return commonFunc.getLocalImagePath(`dark_icons/${imgName}`);
  },
  DownloadCSV(data, fileName) {
    try {
      const blob = new Blob([data], { type: "text/csv" });
    saveAs(blob, fileName);
    } catch (error) {
      console.error(`Error occurred while downloading file: ${error}`);
    }
  },
  getActivityImage(activityName){
    if(activityName ===  activityName.toUpperCase()){
      return 'product.svg'
    }
    if(activityName === activityName.toUpperCase()){
      return 'market.svg'
    }
  
    if(activityName === activityName.toUpperCase()){
      return 'fund.svg'
    }
    if(activityName === activityName.toUpperCase()){
      return 'corporate.svg'
    }
  },
  
  getAssetImage(assetName){
    if(assetName === 'Concept'){
      return 'concept.svg'
    }
  
    if(assetName === 'Competence'){
      return 'competence.svg'
    }
  
    if(assetName === 'Capital'){
      return 'capital.svg'
    }
  
    if(assetName === 'Connection'){
      return 'connection.svg'
    }
  
    if(assetName === 'Commitment'){
      return 'commitment.svg'
    }
  
    if(assetName === 'Business Creation'){
      return 'creation.svg'
    }
  },
  
};

export default commonFunc;
