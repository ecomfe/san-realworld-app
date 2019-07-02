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
    },

    getComments(slug) {
        return axios.get(`${config.API_URL}/articles/${slug}/comments`);
    },

    removeComment(slug, commentId) {
        return axios.delete(`${config.API_URL}/articles/${slug}/comments/${commentId}`);
    },

    addComment(slug, comment) {
        return axios.post(`${config.API_URL}/articles/${slug}/comments`, {
            comment: { body: comment }
        });
    },

    addFavorite(slug) {
        return axios.post(`${config.API_URL}/articles/${slug}/favorite`);
    },

    removeFavorite(slug) {
        return axios.delete(`${config.API_URL}/articles/${slug}/favorite`);
    }
}