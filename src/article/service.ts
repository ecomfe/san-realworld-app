import config from '../common/config';
import axios from 'axios';
import { ProfileResponse, Article, ArticlesResponse, ArticleResponse, ArticleCreate, ArticleUpdate, CommentsResponse, CommentResponse } from '../types';

export default {
    fetch(params: any): any {
        return axios.get(`${config.API_URL}/articles`, {params});
    },

    fetchFeed(params: any): any {
        return axios.get(`${config.API_URL}/articles/feed`, {params});
    },

    tags(): any {
        return axios.get(`${config.API_URL}/tags`);
    },

    add(article: ArticleCreate): any {
        return axios.post(`${config.API_URL}/articles`, {article});
    },

    update(slug: string, article: ArticleUpdate): any {
        return axios.put(`${config.API_URL}/articles/${slug}`, {article});
    },

    remove(slug: string): any {
        return axios.delete(`${config.API_URL}/articles/${slug}`);
    },

    get(slug: string): any {
        return axios.get(`${config.API_URL}/articles/${slug}`);
    },

    getComments(slug: string): any {
        return axios.get(`${config.API_URL}/articles/${slug}/comments`);
    },

    removeComment(slug: string, commentId: number): any {
        return axios.delete(`${config.API_URL}/articles/${slug}/comments/${commentId}`);
    },

    addComment(slug: string, comment: string): any {
        return axios.post(`${config.API_URL}/articles/${slug}/comments`, {
            comment: { body: comment }
        });
    },

    addFavorite(slug: string): any {
        return axios.post(`${config.API_URL}/articles/${slug}/favorite`);
    },

    removeFavorite(slug: string): any {
        return axios.delete(`${config.API_URL}/articles/${slug}/favorite`);
    }
}