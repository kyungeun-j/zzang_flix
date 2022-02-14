import { LOGIN_CHECK, LOGIN_USER, LOGOUT_USER } from './types';
import axios from 'axios';

const USER_URL = '/api/user';

// 로그인 여부 체크
// payload = 로그인 X -> false, 로그인 O -> email
export async function loginCheck(token) {
    const result = await axios.post(USER_URL+'/loginCheck', token).then(res => res.data);

    return {
        type: LOGIN_CHECK,
        payload: result
    };
}

// 로그인
export async function loginUser(loginData) {
    const result = await axios.post(USER_URL+'/login', loginData).then(res => res.data);

    return {
        type: LOGIN_USER,
        payload: result
    };
}

// 로그아웃
export async function logoutUser(token) {
    const result = await axios.post(USER_URL+'/logout', token).then(res => res.data);

    return {
        type: LOGOUT_USER,
        payload: result
    };
}

// 이메일 중복확인
export async function compareEmail(email) {
    return await axios.post(USER_URL+'/compare_email', email).then(res => res.data.compareResult);
}

// 회원가입
export async function registerUser(userData) {
    const result = await axios.post(USER_URL+'/register', userData).then(res => res.data);

    return {
        registerUser: result
    };
}