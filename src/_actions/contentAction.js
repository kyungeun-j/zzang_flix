import { GENRE_LIST } from './types';
import axios from 'axios';

const CONTENT_URL = '/api/content';

// content 리스트
export async function contentList() {
    return await axios.get(CONTENT_URL+'/contentList').then(res => res.data);
}

// genre 리스트
export async function genreList() {
    return await axios.get(CONTENT_URL+'/genreList').then(res => res.data);
}