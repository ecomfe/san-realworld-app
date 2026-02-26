import { store } from 'san-store';
import { updateBuilder } from 'san-update';
import axios from 'axios';
import service from './service';
import { getToken, setToken, setRequestHeaderToken as setAuthHeader } from '../common/jwt';
import { whenNoError } from '../common/action';
import { User } from '../types';


export const Types = {
    LOGIN: 'userLogin' as const,
    GET: 'userGet' as const,
    REGISTER: 'userRegister' as const,
    SET_AUTH: 'userSetAuth' as const,
    PURGE_AUTH: 'userPurgeAuth' as const,
    UPDATE: 'userUpdate' as const
};

store.addAction(Types.LOGIN, function (payload: { email: string; password: string }, context?: any) {
    return service.login(payload).then(
        whenNoError((data: { user: User }) => {
            if (context?.dispatch) {
                context.dispatch(Types.SET_AUTH, data.user);
            }
        })
    );
});


store.addAction(Types.GET, function (payload: any, context?: any) {
    if (context?.getState && context.getState('user')) {
        return;
    }

    let token = getToken();
    if (token) {
        setAuthHeader(token);
        return service.get().then(
            whenNoError((data: { user: User }) => {
                if (context?.dispatch) {
                    context.dispatch(Types.SET_AUTH, data.user);
                }
            })
        );
    }
});

store.addAction(Types.REGISTER, function (payload: { username: string; email: string; password: string }, context?: any) {
    return service.register(payload).then(
        whenNoError((data: { user: User }) => {
            if (context?.dispatch) {
                context.dispatch(Types.SET_AUTH, data.user);
            }
        })
    );
});

store.addAction(Types.SET_AUTH, function (user: User, context?: any) {
    if (user.token) {
        setToken(user.token);
        setAuthHeader(user.token);
    }
    return updateBuilder()
        .set('user', user)
        .set('isAuthenticated', true);
});

store.addAction(Types.PURGE_AUTH, function (user: User, context?: any) {
    import('../common/jwt').then(({clearToken}) => {
        clearToken();
    });
    delete axios.defaults.headers.common['Authorization'];
    return updateBuilder()
        .set('user', {})
        .set('isAuthenticated', false);
});

store.addAction(Types.UPDATE, function (payload: { email: string; username: string; password?: string; image?: string; bio?: string }, context?: any) {
    const { email, username, password, image, bio } = payload;
    const user: Partial<User> = {
        email,
        username,
        bio,
        image
    };

    if (password) {
        user.password = password;
    }

    return service.update(user as User).then(
        whenNoError((data: { user: User }) => {
            if (context?.dispatch) {
                context.dispatch(Types.SET_AUTH, data.user);
            }
        })
    );
});

function setRequestHeaderToken(token: string): void {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
}