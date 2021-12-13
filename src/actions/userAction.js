import { REGISTER_USER } from './types';
import axios from 'axios';

const USER_URL = '/api/user';

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

export async function loginUser(userData) {
    await axios.post(USER_URL+'/login', userData).then(res => res.data.loginSuccess)

    delete userData['userID']
    return {
        user: userData
    };
}