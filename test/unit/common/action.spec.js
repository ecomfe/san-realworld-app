import { store } from 'san-store';
import { Types } from '../../../src/common/action';

describe('Common Action', () => {
  it('set errors and clear errors', () => {
    store.dispatch(Types.ERRORS_SET, {title: 'one'});

    let errors = store.getState('errors');
    expect(errors.length).toBe(1);
    expect(errors[0]).toBe('title one');

    store.dispatch(Types.ERRORS_CLEAR);
    expect(store.getState('errors') == null).toBeTruthy();
  });
});