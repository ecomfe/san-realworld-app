import config from '../common/config';
import axios from 'axios';

export default {
    get(username) {
        return axios.get(`${config.API_URL}/profiles/${username}`);
    },

    follow(username) {
        return axios.post(`${config.API_URL}/profiles/${username}/follow`);
    },

    unfollow(username) {
        return axios.delete(`${config.API_URL}/profiles/${username}/follow`);
    }
}