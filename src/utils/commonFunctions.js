/* eslint-disable no-unreachable */
import NoImage from "@assets/images/no-image.jpg";
import moment from "moment";

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  return localStorage.removeItem("token");
};

const getUserName = () => {
  return localStorage.getItem("name");
};

const setUserName = (data) => {
  localStorage.setItem("name", data);
};

const removeUserName = () => {
  return localStorage.removeItem("name");
};

const getUserId = () => {
  return localStorage.getItem("id");
};

const setUserId = (data) => {
  localStorage.setItem("id", data);
};

const removeUserId = () => {
  return localStorage.removeItem("id");
};

const getRole = () => {
  return localStorage.getItem("role");
};

const setRole = (role) => {
  localStorage.setItem("role", role);
};

const removeRole = () => {
  return localStorage.removeItem("role");
};

const handleColorClass = (index) => {
  index = String(index).slice(-1);
  switch (index) {
    case "2":
    case "8":
      return "brown-color";
      break;
    case "3":
    case "9":
      return "orange-color";
      break;
    case "4":
    case "0":
      return "yellow-color";
      break;
    case "5":
      return "blue-color";
      break;
    case "6":
      return "green-color";
      break;

    default:
      return "";
      break;
  }
};
const handleBrandReqColor = (index)=>{
  switch (index) {
    case 1:
      return "green"
      break;
    case 2:
      return "red"
      break;
    case 3:
      return "yellow"
      break;
  
    default:
      break;
  }
}
const setImageArray = (image, gallery) => {
  let arr = [];
  arr = gallery ? gallery.split(",") : [];
  image && arr.splice(0, 0, image);
  return arr?.length ? arr : [NoImage];
};

const setToLocalStore = (name, data, stringfy) => {
  let response = stringfy
    ? localStorage.setItem(name, JSON.stringify(data))
    : localStorage.setItem(name, data);
  return response;
};
const getFromLocalStore = (name, parse) => {
  let response = parse
    ? JSON.parse(localStorage.getItem(name))
    : localStorage.getItem(name);
  return response;
};

const removeLocalStore = (name) => {
  return localStorage.removeItem(name);
};

const utcToLocal = (date, format) => {
  if (date) {
    let localTime = moment.utc(date).local().format(format);
    return localTime;
  }
  return "";
};
const allowOnlyNumbers = (event) => {
  if (event.key.length === 1 && /\D/.test(event.key)) {
    event.preventDefault();
  }
};

const allowOnlyDecimal = (event) => {
  if (event.key.length === 1 && !/^\d*\.?\d*$/.test(event.key)) {
    event.preventDefault();
  }
};

const fileToUrl = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      let image = e.target.result.toString();
      resolve(image);
    };
    reader.readAsDataURL(file);
  });
};

const strToURL = (str, protocol) => {
  if (str.indexOf("http://") === 0 || str.indexOf("https://") === 0) {
    return str;
  } else {
    if (str.indexOf("www.") === 0) {
      let pro;
      if (protocol === "http://www." || protocol === "https://www.") {
        pro = protocol.replace("www.", "");
        return `${pro}${str}`;
      } else {
        return `${protocol}${str}`;
      }
    } else {
      return protocol === "http://" || protocol === "https://"
        ? `${protocol}www.${str}`
        : `${protocol}${str}`;
    }
  }
};

const getProductHistoryOrderFormat = (history) => {
  const detailsFields = [
    "Select Brand",
    "Product Name",
    "Product Headline",
    "Product Category",
    "Product Description",
    "Featured Product Thumbnail",
    "Upload Nutrition Facts",
    "Products Gallery",
    "Product Ingredients",
  ];

  let abb = history && Object.entries(history);

  let obj = [];
  let arr = [];

  for (let i = 0; i < detailsFields.length; i++) {
    for (let j = 0; j < abb?.length; j++) {
      arr = [];

      if (detailsFields[i] === abb[j][1].field_name) {
        if (detailsFields[i] === "Products Gallery") {
          arr.push(detailsFields[i]);
          arr.push([
            "https://eatroutes-stage.s3.ca-central-1.amazonaws.com/vrm/Sample-png-image-100kb.png",
            "https://eatroutes-stage.s3.ca-central-1.amazonaws.com/vrm/Sample-png-image-100kb.png",
          ]);
          arr.push([
            "https://eatroutes-stage.s3.ca-central-1.amazonaws.com/vrm/Sample-png-image-100kb.png",
            "https://eatroutes-stage.s3.ca-central-1.amazonaws.com/vrm/Sample-png-image-100kb.png",
          ]);
          obj.push(arr);
          break;
        }

        arr.push(detailsFields[i]);
        arr.push(abb[j][1].old_value);
        arr.push(abb[j][1].updated_value);
        obj.push(arr);

        break;
      }
    }
    // if(flag==0)
    // {
    //  arr.push(detailsFields[i]);
    //  arr.push("N.A");
    //  arr.push("N.A");
    // }
  }

  return obj;
};
const getProductHistoryNewFlavorFormat = (history) => {
  let abb = history && Object.entries(history);
  let arr = [];

  for (let i = 0; i < abb?.length; i++) {
    if (abb[i][1].field_name === "Product Variations") {
      arr.push(abb[i][1].updated_value);
    }
  }

  return arr;
};

const getProductHistoryOldFlavorFormat = (history) => {
  let abb = history && Object.entries(history);
  let arr = [];

  for (let i = 0; i < abb?.length; i++) {
    if (abb[i][1].field_name === "Product Variations") {
      arr.push(abb[i][1].old_value);
    }
  }

  return arr;
};
const getProductHistoryOtherFormat = (history) => {
  const detailsFields = [
    "Product Self Life (Months)",
    "Country Of Origin",
    "Currency",
    "Units Per Case",
    "Units Per Master Case",
    "Units Per Pallet",
    "Pallet Length",
    "Pallet Width",
    "Pallet Height",
  ];

  let abb = history && Object.entries(history);

  let obj = [];
  let arr = [];

  for (let i = 0; i < detailsFields.length; i++) {
    arr = [];

    for (let j = 0; j < abb?.length; j++) {
      if (detailsFields[i] === abb[j][1].field_name) {
        arr.push(detailsFields[i]);
        arr.push(abb[j][1].old_value);
        arr.push(abb[j][1].updated_value);

        obj.push(arr);
        break;
      }
    }
    // if(flag==0)
    // {
    //  arr.push(detailsFields[i]);
    //  arr.push("N.A");
    //  arr.push("N.A");
    // }
  }

  return obj;
};

export {
  setToken,
  getToken,
  removeToken,
  allowOnlyDecimal,
  getUserName,
  setUserName,
  removeUserName,
  getUserId,
  setUserId,
  removeUserId,
  getRole,
  setRole,
  removeRole,
  handleColorClass,
  setImageArray,
  setToLocalStore,
  getFromLocalStore,
  removeLocalStore,
  utcToLocal,
  allowOnlyNumbers,
  fileToUrl,
  strToURL,
  getProductHistoryOrderFormat,
  getProductHistoryNewFlavorFormat,
  getProductHistoryOtherFormat,
  getProductHistoryOldFlavorFormat,
  handleBrandReqColor
};
