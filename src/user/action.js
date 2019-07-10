import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import axios from 'axios';
import service from './service';
import jwt from '../common/jwt';
import { whenNoError } from '../common/action';


export const Types = {
    LOGIN: 'userLogin',
    GET: 'userGet',
    REGISTER: 'userRegister',
    SET_AUTH: 'userSetAuth',
    PURGE_AUTH: 'userPurgeAuth',
    UPDATE: 'userUpdate'
};

store.addAction(Types.LOGIN, function (payload, {dispatch}) {
    return service.login(payload).then(
        whenNoError(data => {
            dispatch(Types.SET_AUTH, data.user);
        })
    );
});


store.addAction(Types.GET, function (payload, {getState, dispatch}) {
    if (getState('user')) {
        return;
    }

    let token = jwt.getToken();
    if (token) {
        setRequestHeaderToken(token);
        return service.get().then(
            whenNoError(data => {
                dispatch(Types.SET_AUTH, data.user);
            })
        );
    }
});

store.addAction(Types.REGISTER, function (payload, {dispatch}) {
    return service.register(payload).then(
        whenNoError(data => {
            dispatch(Types.SET_AUTH, data.user);
        })
    );
});

store.addAction(Types.SET_AUTH, function (user, {dispatch}) {
    jwt.setToken(user.token);
    setRequestHeaderToken(user.token);
    return updateBuilder()
        .set('user', user)
        .set('isAuthenticated', true);
});

store.addAction(Types.PURGE_AUTH, function (user, {dispatch}) {
    jwt.clearToken();
    delete axios.defaults.headers.common['Authorization'];
    return updateBuilder()
        .set('user', {})
        .set('isAuthenticated', false);
});

store.addAction(Types.UPDATE, function (payload, {dispatch}) {
    const { email, username, password, image, bio } = payload;
    const user = {
        email,
        username,
        bio,
        image
    };

    if (password) {
        user.password = password;
    }

    return service.update(user).then(
        whenNoError(data => {
            dispatch(Types.SET_AUTH, data.user);
        })
    );
});

function setRequestHeaderToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
}
