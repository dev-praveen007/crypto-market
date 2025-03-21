import toast from "react-hot-toast";
import CryptoJS from 'crypto-js'


export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

export const ToastContainer = (type, message, options) => toast[type || "error"](message || "Error occured", options);

const SECRET_KEY = process.env.REACT_APP_SECRET

// Encrypt function
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
export const decryptData = (ciphertext) => {
    if (!ciphertext) return
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// set values to the local storage in encrption.
export const setLocal = (key, value) => localStorage.setItem(key, encryptData(JSON.stringify({ data: value })))

// get values from the local storage with decryption.
export const getLocal = (key) => JSON.parse(decryptData(localStorage.getItem(key)) || "{}")?.data;

export const isEmpty = (value) =>
    value === undefined ||
    value == "undefined" ||
    value === null ||
    value == false ||
    value == "false" ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "object" && Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value === "string" && value === "0") ||
    (typeof value === "number" && value === 0);


export const sleep = async (ms) => new Promise(res => setTimeout(() => res(), ms))