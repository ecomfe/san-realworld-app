import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import service from './service';
import { whenNoError } from '../common/action';
import { Profile } from '../types';


export const Types = {
    FETCH: 'profileFetch' as const,
    SET: 'profileSet' as const,
    RESET: 'profileReset' as const,
    FOLLOW: 'profileFollow' as const,
    UNFOLLOW: 'profileUnfollow' as const
};

store.addAction(Types.FETCH, function (user: string, context?: any) {
    if (context?.dispatch) {
        context.dispatch(Types.SET, {});
    }
    return service.get(user).then(
        whenNoError((data: { profile: Profile }) => {
            if (context?.dispatch) {
                context.dispatch(Types.SET, data.profile);
            }
        })
    );
});

store.addAction(Types.SET, function (profile: Profile, context?: any) {
    return updateBuilder().set('profile', profile);
});

store.addAction(Types.RESET, function (profile: Profile, context?: any) {
    return updateBuilder().set('profile', null);
});

store.addAction(Types.FOLLOW, function (user: string, context?: any) {
    return service.follow(user).then(
        whenNoError((data: { profile: Profile }) => {
            if (context?.getState && context.getState('profile')) {
                if (context?.dispatch) {
                    context.dispatch(Types.SET, data.profile);
                }
            }
        })
    );
});

store.addAction(Types.UNFOLLOW, function (user: string, context?: any) {
    return service.unfollow(user).then(
        whenNoError((data: { profile: Profile }) => {
            if (context?.getState && context.getState('profile')) {
                if (context?.dispatch) {
                    context.dispatch(Types.SET, data.profile);
                }
            }
        })
    );
});