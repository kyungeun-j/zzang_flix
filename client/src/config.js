import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: "https://zzang-flix.herokuapp.com/api/"
    baseURL: "http://localhost:4000/api/"
});