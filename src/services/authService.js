import axios from "axios";
import { baseUrl } from "./baseUrl";

export const get = (route) => {
    let token = localStorage.getItem("authToken");

    return axios.get(baseUrl + route, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const post = (route, body) => {
    let token = localStorage.getItem("authToken");

    return axios.post(baseUrl + route, body, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateProfile = (userId, updatedProfile) => {
    let token = localStorage.getItem("authToken");

    return axios.put(baseUrl + `/users/${userId}`, updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
    });
};