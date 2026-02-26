const config = {
    API_URL: 'https://api.realworld.show/api',
    PAGE_SIZE: 10
} as const;

export default config;

export type Config = typeof config;