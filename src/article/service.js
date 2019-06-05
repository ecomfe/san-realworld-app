import config from '../common/config';
import axios from 'axios';

export default {
    fetch(params) {
        return axios.get(`${config.API_URL}/articles`, {params});
    },

    tags() {
        return axios.get(`${config.API_URL}/tags`);
    }
}