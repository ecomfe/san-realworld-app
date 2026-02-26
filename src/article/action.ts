import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import service from './service';
import config from '../common/config';
import { whenNoError } from '../common/action';
import { Article, ArticleCreate, Profile } from '../types';


export const Types = {
    FETCH: 'articleFetch' as const,
    FETCHING: 'articleFetching' as const,
    FETCH_FILL: 'articleFetchFill' as const,
    TAGS: 'articleTags' as const,
    TAGS_FILL: 'articleTagsFill' as const,
    ADD: 'articleAdd' as const,
    EDIT: 'articleEdit' as const,
    REMOVE: 'articleRemove' as const,
    RESET: 'articleReset' as const,
    SET: 'articleSet' as const,
    SET_AUTHOR: 'articleSetAuthor' as const,
    SET_LIST_ITEM: 'articleSetListItem' as const,
    GET: 'articleGet' as const,
    ADD_TAG: 'articleAddTag' as const,
    REMOVE_TAG: 'articleRemoveTag' as const,
    ADD_COMMENT: 'articleAddComment' as const,
    GET_COMMENTS: 'articleGetComments' as const,
    FILL_COMMENTS: 'articleFillComments' as const,
    REMOVE_COMMENT: 'articleRemoveComment' as const,
    ADD_FAVORITE: 'articleAddFavorite' as const,
    REMOVE_FAVORITE: 'articleRemoveFavorite' as const
};

interface FetchPayload {
    page?: number;
    feed?: boolean;
    author?: string;
    tag?: string;
    favorited?: string;
}

store.addAction(Types.FETCH, function (payload: FetchPayload = {}, context?: any) {
    let params: any = {
        limit: config.PAGE_SIZE,
        offset: config.PAGE_SIZE * (payload.page || 0)
    };

    let fetch = service.fetch;
    if (payload.feed) {
        fetch = service.fetchFeed;
    }
    else {
        if (payload.author) {
            params.author = payload.author;
        }

        if (payload.tag) {
            params.tag = payload.tag;
        }

        if (payload.favorited) {
            params.favorited = payload.favorited;
        }
    }

    if (context?.dispatch) {
        context.dispatch(Types.FETCHING);
    }
    return fetch(params).then((response: any) => {
        if (context?.dispatch) {
            context.dispatch(Types.FETCH_FILL, response.data);
        }
    });
});

store.addAction(Types.FETCHING, function () {
    return updateBuilder().set('articlesLoading', true);
});

store.addAction(Types.FETCH_FILL, function ({articles, articlesCount}: { articles: Article[]; articlesCount: number }) {
    return updateBuilder()
        .set('articles', articles)
        .set('articleCount', articlesCount)
        .set('articlesLoading', false)
        .set('articlePageCount', Math.ceil(articlesCount / config.PAGE_SIZE));
});

store.addAction(Types.TAGS, function (payload: any, context?: any) {
    return service.tags().then((response: any) => {
        if (context?.dispatch) {
            context.dispatch(Types.TAGS_FILL, response.data);
        }
    });
});

store.addAction(Types.TAGS_FILL, function (data: { tags: string[] }) {
    return updateBuilder().set('tags', data.tags);
});

store.addAction(Types.RESET, function () {
    return updateBuilder()
        .set('article', {
            author: {},
            title: "",
            description: "",
            body: "",
            tagList: []
        })
        .set('comments', []);
});

store.addAction(Types.GET, function (slug: string, context?: any) {
    return service.get(slug).then(({data}: any) => {
        if (context?.dispatch) {
            context.dispatch(Types.SET, data.article);
        }
    });
});

store.addAction(Types.SET, function (article: Article) {
    return updateBuilder().set('article', article);
});

store.addAction(Types.SET_AUTHOR, function (author: Profile) {
    return updateBuilder().set('article.author', author);
});

store.addAction(Types.ADD_TAG, function (tag: string) {
    return updateBuilder().push('article.tagList', tag);
});

store.addAction(Types.REMOVE_TAG, function (tag: string) {
    return updateBuilder().remove('article.tagList', tag);
});

store.addAction(Types.REMOVE, function (slug: string) {
    return service.remove(slug);
});

store.addAction(Types.ADD, function (article: ArticleCreate, context?: any) {
    return service.add(article).then(whenNoError());
});

store.addAction(Types.EDIT, function (article: Article & { slug: string }, context?: any) {
    return service.update(article.slug, article).then(whenNoError());
});

store.addAction(Types.ADD_COMMENT, function (payload: { slug: string; comment: string }, context?: any) {
    return service.addComment(payload.slug, payload.comment)
        .then(() => {
            if (context?.dispatch) {
                context.dispatch(Types.GET_COMMENTS, payload.slug);
            }
        });
});

store.addAction(Types.GET_COMMENTS, function (slug: string, context?: any) {
    return service.getComments(slug).then(({data}: any) => {
        if (context?.dispatch) {
            context.dispatch(Types.FILL_COMMENTS, data.comments);
        }
    });
});


store.addAction(Types.FILL_COMMENTS, function (comments: any[]) {
    return updateBuilder().set('comments', comments);
});

store.addAction(Types.REMOVE_COMMENT, function (payload: { slug: string; commentId: number }, context?: any) {
    return service.removeComment(payload.slug, payload.commentId)
        .then(() => {
            if (context?.dispatch) {
                context.dispatch(Types.GET_COMMENTS, payload.slug);
            }
        });
});

store.addAction(Types.ADD_FAVORITE, function (slug: string, context?: any) {
    return service.addFavorite(slug).then(
        ({data}: any) => {
            if (context?.dispatch) {
                context.dispatch(Types.SET, data.article);
                context.dispatch(Types.SET_LIST_ITEM, data.article);
            }
        }
    );
});

store.addAction(Types.REMOVE_FAVORITE, function (slug: string, context?: any) {
    return service.removeFavorite(slug).then(
        ({data}: any) => {
            if (context?.dispatch) {
                context.dispatch(Types.SET, data.article);
                context.dispatch(Types.SET_LIST_ITEM, data.article);
            }
        }
    );
});

store.addAction(Types.SET_LIST_ITEM, function (article: Article, context?: any) {
    if (context?.getState) {
        let articles = context.getState('articles');

        if (articles) {
            for (let i = 0; i < articles.length; i++) {
                if (articles[i].slug === article.slug) {
                    return updateBuilder().set('articles[' + i + ']', article);
                }
            }
        }
    }
    return updateBuilder();
});