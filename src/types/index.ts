// User related types
export interface User {
    email: string;
    token?: string;
    username: string;
    bio?: string;
    image?: string;
    password?: string;
}

export interface UserResponse {
    user: User;
}

// Article related types
export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}

export interface ArticleCreate {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}

export interface ArticleUpdate {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
}

export interface ArticleResponse {
    article: Article;
}

export interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}

// Profile related types
export interface Profile {
    username: string;
    bio?: string;
    image?: string;
    following?: boolean;
}

export interface ProfileResponse {
    profile: Profile;
}

// Comment related types
export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Profile;
}

export interface CommentResponse {
    comment: Comment;
}

export interface CommentsResponse {
    comments: Comment[];
}

// Tag related types
export interface TagsResponse {
    tags: string[];
}

// Error related types
export interface Errors {
    [key: string]: string[];
}

export interface ErrorResponse {
    errors: Errors;
}

// API parameters
export interface ArticlesParams {
    limit?: number;
    offset?: number;
    tag?: string;
    author?: string;
    favorited?: string;
}

// Store state types
export interface RootState {
    user?: User;
    isAuthenticated: boolean;
    errors?: string[] | null;
    tags?: string[];
    articles?: Article[];
    articlesCount?: number;
    comments?: Comment[];
    profile?: Profile;
}