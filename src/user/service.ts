import config from '../common/config';
import axios from 'axios';
import { User, UserResponse } from '../types';

export default {
    login(user: { email: string; password: string }): any {
        return axios.post(`${config.API_URL}/users/login`, {user});
    },

    register(user: { username: string; email: string; password: string }): any {
        return axios.post(`${config.API_URL}/users`, {user});
    },

    update(user: User): any {
        return axios.put(`${config.API_URL}/user`, user);
    },

    get(): any {
        return axios.get(`${config.API_URL}/user`);
    }
}