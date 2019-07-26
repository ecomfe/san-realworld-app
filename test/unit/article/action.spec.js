import { store } from 'san-store';
import { Types } from '../../../src/article/action';

describe('Acticle Action', () => {
  it('fetch list', done => {
    let fetchPromise = store.dispatch(Types.FETCH);

    expect(store.getState('articlesLoading')).toBeTruthy();

    fetchPromise.then(() => {
        expect(store.getState('articlesLoading')).toBeFalsy();
        expect(store.getState('articleCount')).toBe(500);
        expect(store.getState('articlePageCount')).toBeGreaterThan(0);
        expect(store.getState('articles') instanceof Array).toBeTruthy();

        done();
    });


  });
});