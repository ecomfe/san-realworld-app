import Header from './components/header';
import Footer from './components/footer';
import Login from './user/login';
import Register from './user/register';
import ArticleList from './article/list';
import {router} from 'san-router';

function bootstrap() {
    (new Header).attach(document.getElementById('header'));
    (new Footer).attach(document.getElementById('footer'));

    router.add({rule: '/', Component: ArticleList});
    router.add({rule: '/login', Component: Login});
    router.add({rule: '/register', Component: Register});
    router.start();
}

bootstrap();