import Header from './components/header';
import Footer from './components/footer';
import {router} from 'san-router'

function bootstrap() {
    router.start()
    
    let mainEl = document.getElementById('main');
    (new Header).attach(mainEl);
    (new Footer).attach(mainEl);
}

bootstrap();