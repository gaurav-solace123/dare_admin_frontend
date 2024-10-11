import { format } from "date-fns";
import { saveAs } from 'file-saver';
const commonFunc = {
  setEncodedValue: (key, value) => {
    const encodedValue = btoa(value);
    localStorage.setItem(key, encodedValue);
  },

  getDecodedValue: (key) => {
    const encodedValue = localStorage.getItem(key);
    return encodedValue ? atob(encodedValue) : null; // Decode if exists
  },
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
   formatNumberWithCommas(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  getLocalImagePath: (imgName) => {
    return `/images/${imgName}`;
  },
  getLocationIcons: (imgName) => {
    return `/assets/images/pin_big/${imgName}`;
  },
  getPriceRoundOf: (param) => {
    return param;
    // return param.toLocaleString('en-IN', { maximumFractionDigits: 2, currency: 'INR' });
  },
  DownloadCSV(data, fileName) {
    try {
      const blob = new Blob([data], { type: "text/csv" });
    saveAs(blob, fileName);
    } catch (error) {
      console.error(`Error occurred while downloading file: ${error}`);
    }
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

  
  deleteCookie(name) {
    document.cookie =
      name + "=; Max-Age=0; path=/; domain=" + window.location.hostname;
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

   generateHTMLContent : (items) => {
    const htmlContent = `
      <ul>
        ${items.map(item => `<li>${item.detailText}</li>`).join("")}
      </ul>
    `;

    return htmlContent;
  }
  
  
};

export default commonFunc;
