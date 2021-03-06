import Header from './common/components/header';
import Footer from './common/components/footer';
import Login from './user/login';
import Register from './user/register';
import Setting from './user/setting';
import Home from './article/home';
import ArticleEdit from './article/edit';
import ArticleView from './article/view';
import ProfileMy from './profile/my';
import ProfileFavorited from './profile/favorited';
import { router } from 'san-router';
import { store } from 'san-store';
import { Types as ActionTypes } from './common/action';
import { Types as UserActionTypes } from './user/action';
import axios from 'axios';
import jwt from './common/jwt';



function bootstrap() {
    axios.defaults.validateStatus = function (status) {
        return status >= 200 && status < 500;
    };

    (new Header).attach(document.getElementById('header'));
    (new Footer).attach(document.getElementById('footer'));

    router.listen(e => {
        store.dispatch(ActionTypes.ERRORS_CLEAR);
        store.dispatch(UserActionTypes.GET);
    });

    router.add({rule: '/', Component: Home});
    router.add({rule: '/tag/:tag', Component: Home});
    router.add({rule: '/my-feed', Component: Home});
    router.add({rule: '/login', Component: Login});
    router.add({rule: '/register', Component: Register});
    router.add({rule: '/settings', Component: Setting});
    router.add({rule: '/profile/:user', Component: ProfileMy});
    router.add({rule: '/profile/:user/favorites', Component: ProfileFavorited});
    router.add({rule: '/editor', Component: ArticleEdit});
    router.add({rule: '/editor/:slug', Component: ArticleEdit});
    router.add({rule: '/article/:slug', Component: ArticleView});

    
    router.start();
}

bootstrap();