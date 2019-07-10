import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import service from './service';
import { whenNoError } from '../common/action';


export const Types = {
    FETCH: 'profileFetch',
    SET: 'profileSet',
    RESET: 'profileReset',
    FOLLOW: 'profileFollow',
    UNFOLLOW: 'profileUnfollow'
};

store.addAction(Types.FETCH, function (user, {dispatch}) {
    dispatch(Types.SET, {});
    return service.get(user).then(
        whenNoError(data => {
            dispatch(Types.SET, data.profile);
        })
    );
});

store.addAction(Types.SET, function (profile, {dispatch}) {
    return updateBuilder().set('profile', profile);
});

store.addAction(Types.RESET, function (profile, {dispatch}) {
    return updateBuilder().set('profile', null);
});

store.addAction(Types.FOLLOW, function (user, {dispatch, getState}) {
    return service.follow(user).then(
        whenNoError(data => {
            if (getState('profile')) {
                dispatch(Types.SET, data.profile);
            }
        })
    );
});

store.addAction(Types.UNFOLLOW, function (user, {dispatch, getState}) {
    return service.unfollow(user).then(
        whenNoError(data => {
            if (getState('profile')) {
                dispatch(Types.SET, data.profile);
            }
        })
    );
});