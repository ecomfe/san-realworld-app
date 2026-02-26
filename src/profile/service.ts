import config from '../common/config';
import axios from 'axios';
import { ProfileResponse } from '../types';

export default {
    get(username: string): any {
        return axios.get(`${config.API_URL}/profiles/${username}`);
    },

    follow(username: string): any {
        return axios.post(`${config.API_URL}/profiles/${username}/follow`);
    },

    unfollow(username: string): any {
        return axios.delete(`${config.API_URL}/profiles/${username}/follow`);
    }
}