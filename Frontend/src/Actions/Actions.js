/** Hooks */
import axios, { Axios, setAuthToken } from "../Hooks/Axios";
import { setLocal } from "../utils/common";

const back_url = process.env.REACT_APP_API_URL

/** Register */
export const userRegistration = async (data) => {
    try {
        const result = await Axios({
            method: "POST",
            url: `${back_url}/api/auth/register`,
            data: data
        })
        return result
    } catch (e) {
        console.log("userRegistration_err", e)
    }
}


/** Login */
export const userLogin = async (data) => {
    try {
        const result = await Axios({
            method: "POST",
            url: `${back_url}/api/auth/login`,
            data: data
        })
        if (result?.status === "success") {
            setAuthToken(result?.data?.token);
            setLocal("token",result?.data?.token);
        }
        return result
    } catch (e) {
        console.log("userLogin_err", e)
    }
}


export const getMarketPrice = async (data) => {
    try {
        const result = await Axios({
            method: "GET",
            url: `${back_url}/api/market/prices`,
            params: data
        })
        return result
    } catch (e) {
        console.log("userLogin_err", e)
    }
}

export const getCoinDetails = async (data) => {
    try {
        const result = await Axios({
            method: "GET",
            url: `${back_url}/api/market/coin-portfolio`,
            params: data
        })
        return result
    } catch (e) {
        console.log("userLogin_err", e)
    }
}

export const tokenAuthenticator = async (data) => {
    try {
        const result = await Axios({
            method: "GET",
            url: `${back_url}/api/auth/tokenAuthenticator`,
        })
        return result
    } catch (e) {
        console.log("userRegistration_err", e)
    }
}

export const BuyCryptos = async (data) => {
    try {
        const result = await Axios({
            method: "POST",
            url: `${back_url}/api/holdings/buy`,
            data: data
        })
        return result
    } catch (e) {
        console.log("userRegistration_err", e)
    }
}

export const SellCryptos = async (data) => {
    try {
        const result = await Axios({
            method: "POST",
            url: `${back_url}/api/holdings/sell`,
            data: data
        })
        return result
    } catch (e) {
        console.log("userRegistration_err", e)
    }
}

export const getUserHoldings = async (data) => {
    try {
        const result = await Axios({
            method: "GET",
            url: `${back_url}/api/holdings`,
        })
        return result
    } catch (e) {
        console.log("userRegistration_err", e)
    }
}
