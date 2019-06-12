import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import service from './service';
import config from '../common/config';


export const Types = {
    FETCH: 'articleFetch',
    FETCH_FILL: 'articleFetchFill',
    TAGS: 'articleTags',
    TAGS_FILL: 'articleTagsFill'
};

store.addAction(Types.FETCH, function (payload, {dispatch}) {
    let params = {
        limit: config.PAGE_SIZE,
        offset: config.PAGE_SIZE * (payload.page || 0)
    };

    if (payload.author) {
        params.author = payload.author;
    }

    if (payload.tag) {
        params.tag = payload.tag;
    }

    if (payload.favorited) {
        params.favorited = payload.favorited;
    }


    return service.fetch(params).then(response => {
        dispatch(Types.FETCH_FILL, response.data);
    });
});

store.addAction(Types.FETCH_FILL, function ({articles, articlesCount}) {
    return updateBuilder()
        .set('articles', articles)
        .set('articleCount', articlesCount)
        .set('articlePageCount', Math.ceil(articlesCount / config.PAGE_SIZE));
});

store.addAction(Types.TAGS, function (payload, {dispatch}) {
    return service.tags().then(response => {
        dispatch(Types.TAGS_FILL, response.data);
    });
});

store.addAction(Types.TAGS_FILL, function (data) {
    return updateBuilder().set('tags', data.tags);
});