import { REGISTER_USER } from './types';
import axios from 'axios';

const USER_URL = '/api/user';

export async function loginUser(loginData) {
    const result = await axios.post(USER_URL+'/login', loginData).then(res => res.data.msg)

    return {
        loginResult: result
    };
}

export async function compareEmail(email) {
    const result = await axios.post(USER_URL+'/compare_email', email).then(res => res.data.compareResult)
    
    return {
        compareEmail: result
    };
}

export async function registerUser(userData) {
    await axios.post(USER_URL+'/register', userData).then(res => res.data.registerSuccess)

    delete userData['userID']
    return {
        type: REGISTER_USER,
        user: userData
    };
}