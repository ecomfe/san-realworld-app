import Header from './components/header';
import Footer from './components/footer';
import Login from './user/login';
import Register from './user/register';
import Setting from './user/setting';
import ArticleList from './article/list';
import ProfileArticles from './profile/articles';
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

    router.add({rule: '/', Component: ArticleList});
    router.add({rule: '/login', Component: Login});
    router.add({rule: '/register', Component: Register});
    router.add({rule: '/settings', Component: Setting});
    router.add({rule: '/profile/:user', Component: ProfileArticles});

    
    router.start();
}

bootstrap();