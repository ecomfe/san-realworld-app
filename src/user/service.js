import config from '../config';
import axios from 'axios';

export default {
    login(user) {
        return axios.post(`${config.API_URL}/users/login`, {user});
    }
}