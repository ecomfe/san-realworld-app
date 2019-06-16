import config from '../common/config';
import axios from 'axios';

export default {
    fetch(params) {
        return axios.get(`${config.API_URL}/articles`, {params});
    },

    tags() {
        return axios.get(`${config.API_URL}/tags`);
    },

    add(article) {
        return axios.post(`${config.API_URL}/articles`, {article});
    },

    update(slug, article) {
        return axios.put(`${config.API_URL}/articles/${slug}`, {article});
    },

    remove(slug) {
        return axios.delete(`${config.API_URL}/articles/${slug}`);
    },

    get(slug) {
        return axios.get(`${config.API_URL}/articles/${slug}`);
    }
}