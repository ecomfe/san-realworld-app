import config from '../common/config';
import axios from 'axios';

export default {
    get(username) {
        return axios.get(`${config.API_URL}/profiles/${username}`);
    }
}