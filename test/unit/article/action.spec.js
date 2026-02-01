import { store } from 'san-store';
import { Types } from '../../../src/article/action';

import Conf from '../../../src/common/config';

describe('Acticle Action', () => {
  it('fetch list', done => {
    let fetchPromise = store.dispatch(Types.FETCH);

    expect(store.getState('articlesLoading')).toBeTruthy();

    fetchPromise.then(() => {
        expect(store.getState('articlesLoading')).toBeFalsy();
        expect(typeof store.getState('articleCount')).toBe('number');
        expect(store.getState('articlePageCount') >= store.getState('articleCount') / Conf.PAGE_SIZE).toBeTruthy();
        expect(store.getState('articles') instanceof Array).toBeTruthy();

        done();
    });


  });
});