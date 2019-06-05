import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import service from './service';
import jwt from '../common/jwt';
import { Types as CommonActionTypes } from '../common/action';


export const Types = {
    LOGIN: 'userLogin',
    REGISTER: 'userRegister',
    SET_AUTH: 'userSetAuth',
    PURGE_AUTH: 'userPurgeAuth'
};

store.addAction(Types.LOGIN, function (payload, {dispatch}) {
    return service.login(payload).then(
        ({data}) => {
            if (data.errors) {
                dispatch(CommonActionTypes.ERRORS_SET, data.errors);
            }
            else {
                dispatch(Types.SET_AUTH, data.user);
            }
            
        }
    );
});

store.addAction(Types.REGISTER, function (payload, {dispatch}) {
    return service.register(payload).then(
        ({data}) => {
            if (data.errors) {
                dispatch(CommonActionTypes.ERRORS_SET, data.errors);
            }
            else {
                dispatch(Types.SET_AUTH, data.user);
            }
            
        }
    );
});

store.addAction(Types.SET_AUTH, function (user, {dispatch}) {
    jwt.setToken(user.token);
    return updateBuilder()
        .set('user', user)
        .set('isAuthenticated', true);
});

store.addAction(Types.PURGE_AUTH, function (user, {dispatch}) {
    jwt.clearToken();
    return updateBuilder()
        .set('user', null)
        .set('isAuthenticated', false);
});
