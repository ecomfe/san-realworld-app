import axios from 'axios';

const TOKEN_KEY = 'jwtToken';

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

export function setRequestHeaderToken(token: string): void {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
}