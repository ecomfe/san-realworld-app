import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import service from './service';
import config from '../config';


export const Types = {
    FETCH: 'articleFetch',
    FETCH_FILL: 'articleFetchFill'
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

store.addAction(Types.FETCH_FILL, function (data) {console.log(data)
    return updateBuilder().set('articles', data.articles);
});