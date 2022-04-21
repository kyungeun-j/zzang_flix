import { LOGIN_CHECK, LOGIN_USER, LOGOUT_USER } from './types';
// import axios from 'axios';
import { axiosInstance } from '../config';

const USER_URL = '/user';

// 로그인 여부 체크
// payload = 로그인 X -> false, 로그인 O -> email
export async function loginCheck(token) {
    const result = await axiosInstance.post(USER_URL+'/loginCheck', token).then(res => res.data);

    return {
        type: LOGIN_CHECK,
        payload: result
    };
}

// 로그인
export async function loginUser(loginData) {
    const result = await axiosInstance.post(USER_URL+'/login', loginData).then(res => res.data);

    return {
        type: LOGIN_USER,
        payload: result
    };
}

// 로그아웃
export async function logoutUser(token) {
    const result = await axiosInstance.post(USER_URL+'/logout', token).then(res => res.data);

    return {
        type: LOGOUT_USER,
        payload: result
    };
}

// 이메일 확인
export async function compareEmail(email) {
    return await axiosInstance.post(USER_URL+'/compare_email', email).then(res => res.data);
}

// 비밀번호 변경
export async function updatePassword(password, email) {
    return await axiosInstance.post(USER_URL+'/update_password', password, email).then(res => res.data);
}

// 회원가입
export async function registerUser(userData) {
    const result = await axiosInstance.post(USER_URL+'/register', userData).then(res => res.data);

    return {
        registerUser: result
    };
}