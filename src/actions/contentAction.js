import { SELECT_GENRE } from './types';
import { request } from '../../utils/axios';

const CONTENT_URL = '/api/content';

export function selectGenre(id) {
    const data = request('get', CONTENT_URL);
    return {
        type: SELECT_GENRE,
        payload: data
    };
}