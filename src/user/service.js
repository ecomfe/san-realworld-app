import config from '../common/config';
import axios from 'axios';

export default {
    login(user) {
        return axios.post(`${config.API_URL}/users/login`, {user});
    },

    register(user) {
        return axios.post(`${config.API_URL}/users`, {user});
    },

    update(user) {
        return axios.put(`${config.API_URL}/user`, user);
    }
}