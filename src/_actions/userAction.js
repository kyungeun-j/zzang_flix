import { LOGIN_USER, AUTH_USER, LOGOUT_USER } from './types';
import axios from 'axios';

const USER_URL = '/api/user';

export async function loginUser(loginData) {
    const result = await axios.post(USER_URL+'/login', loginData).then(res => res.data)

    console.log(result)
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

    return {
        registerUser: result
    }
    // delete userData['userID']
    // return {
    //     type: REGISTER_USER,
    //     user: userData
    // };
}

export function auth() {
    const result = axios.get(USER_URL+'/auth').then(res => res.data)

    return {
        type: AUTH_USER,
        payload: result
    }
}