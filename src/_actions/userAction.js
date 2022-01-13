import { LOGIN_USER, LOGOUT_USER } from './types';
import axios from 'axios';

const USER_URL = '/api/user';

export async function loginUser(loginData) {
    const result = await axios.post(USER_URL+'/login', loginData).then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: result
    };
}

export async function logoutUser(token) {
    const result = await axios.post(USER_URL+'/logout', token).then(res => res.data)

    console.log(result)
    return {
        type: LOGOUT_USER,
        payload: result
    };
}

export async function compareEmail(email) {
    const result = await axios.post(USER_URL+'/compare_email', email).then(res => res.data.compareResult)
    return {
        compareEmail: result
    };
}

export async function registerUser(userData) {
    const result = await axios.post(USER_URL+'/register', userData).then(res => res.data.registerSuccess)

    console.log(result)
    return {
        registerUser: result
    }
}