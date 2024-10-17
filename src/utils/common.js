import { format } from "date-fns";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
const common = {
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
    if (date) {
      return format(date, formatStr);
    } else {
      return "";
    }
  },
  dateFormatWithLocale: (date) => {
    if (date) {
      return dayjs(date).format("MMMM DD, YYYY");
    } else {
      return "";
    }
  },
  formatNumberWithCommas(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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

  generateHTMLContent: (items) => {
    return `
      <ul>
        ${items.map((item) => `<li>${item.detailText}</li>`).join("")}
      </ul>
    `;
  },
};

export default common;
