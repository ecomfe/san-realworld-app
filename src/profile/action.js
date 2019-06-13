import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import service from './service';
import { Types as CommonActionTypes } from '../common/action';


export const Types = {
    FETCH: 'profileFetch',
    SET: 'profileSet'
};

store.addAction(Types.FETCH, function (user, {dispatch}) {
    return service.get(user).then(
        ({data}) => {
            if (data.errors) {
                dispatch(CommonActionTypes.ERRORS_SET, data.errors);
            }
            else {
                dispatch(Types.SET, data.profile);
            }
            
        }
    );
});

store.addAction(Types.SET, function (profile, {dispatch}) {
    return updateBuilder().set('profile', profile);
});