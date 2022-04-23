// import axios from 'axios';
import { axiosInstance } from "../config";
import { CONTENT_LIST, GENRE_LIST } from "./types";

const CONTENT_URL = '/content';

// content 리스트
export async function contentList(genreID) {
    const result = await axiosInstance.post(CONTENT_URL+'/contentList', genreID).then(res => res.data);

    return {
        type: CONTENT_LIST,
        payload: result
    }
}

// genre 리스트
export async function genreList() {
    const result = await axiosInstance.get(CONTENT_URL+'/genreList').then(res => res.data);

    return {
        type: GENRE_LIST,
        payload: result
    }
}