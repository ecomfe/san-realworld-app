// TypeScript 迁移示例
// 这个文件演示如何将现有的 JavaScript 代码迁移到 TypeScript

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

// 定义应用状态类型
interface AppState {
    isAuthenticated: boolean;
    user: UserData | null;
}

interface UserData {
    email: string;
    username: string;
    token: string;
    bio?: string;
    image?: string;
}

function bootstrap(): void {
    // 配置 Axios 默认行为
    axios.defaults.validateStatus = function (status: number): boolean {
        return status >= 200 && status < 500;
    };

    // 组件挂载 - 这些组件目前还是 JS，所以使用 any 类型
    const headerComponent = new (Header as any)();
    const footerComponent = new (Footer as any)();
    headerComponent.attach(document.getElementById('header')!);
    footerComponent.attach(document.getElementById('footer')!);

    // 路由监听器
    router.listen((e: any) => {
        store.dispatch(ActionTypes.ERRORS_CLEAR);
        store.dispatch(UserActionTypes.GET);
    });

    // 路由配置
    router.add({ rule: '/', Component: Home as any });
    router.add({ rule: '/tag/:tag', Component: Home as any });
    router.add({ rule: '/my-feed', Component: Home as any });
    router.add({ rule: '/login', Component: Login as any });
    router.add({ rule: '/register', Component: Register as any });
    router.add({ rule: '/settings', Component: Setting as any });
    router.add({ rule: '/profile/:user', Component: ProfileMy as any });
    router.add({ rule: '/profile/:user/favorites', Component: ProfileFavorited as any });
    router.add({ rule: '/editor', Component: ArticleEdit as any });
    router.add({ rule: '/editor/:slug', Component: ArticleEdit as any });
    router.add({ rule: '/article/:slug', Component: ArticleView as any });

    // 启动路由
    router.start();
}

// DOM 加载完成后启动应用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}

export default bootstrap;
