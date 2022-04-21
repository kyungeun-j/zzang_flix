// import axios from 'axios';
import { axiosInstance } from "../config";

const CONTENT_URL = '/content';

// content 리스트
export async function contentList(genreID) {
    return await axiosInstance.post(CONTENT_URL+'/contentList', genreID).then(res => res.data);
}

// genre 리스트
export async function genreList() {
    return await axiosInstance.get(CONTENT_URL+'/genreList').then(res => res.data);
}