import san from 'san';
import { Link, router } from 'san-router';
import { connect } from 'san-store';
import { Types as ArcitleActionTypes } from '../article/action';
import { Types as ActionTypes } from './action';
import ArticlePreview from '../article/components/preview';
import UserInfo from './components/user-info';

export default connect.san(
    {
        articles: 'articles',
        pageCount: 'articlePageCount',
        profile: 'profile',
        user: 'user',
        isAuthenticated: 'isAuthenticated'
    },
    {
        articles: ArcitleActionTypes.FETCH,
        fetch: ActionTypes.FETCH,
        reset: ActionTypes.RESET,
        follow: ActionTypes.FOLLOW,
        unfollow: ActionTypes.UNFOLLOW
    }
)(san.defineComponent({

    components: {
        'x-preview': ArticlePreview,
        'x-link': Link,
        'x-userinfo': UserInfo
    },

    computed: {
        pages() {
            let pageCount = this.data.get('pageCount');

            if (pageCount) {
                let result = [];
                for (let i = 0; i < pageCount; i++) {
                    result.push(i);
                }

                return result;
            }

            return [0];
        }
    },

    template: `
        <div class="profile-page">
          <x-userinfo is-self="{{user.username === profile.username}}" profile="{{profile}}" />

          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                  <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                      <x-link to="/profile/{{profile.username}}" class="nav-link" active-class="active">My Articles</x-link>
                    </li>
                    <li class="nav-item">
                      <x-link to="/profile/{{profile.username}}/favorites" class="nav-link" active-class="active">Favorited Articles</x-link>
                    </li>
                  </ul>
                </div>

                <div class="profile-page">
                  <x-preview s-for="article in articles" article="{{article}}"/>

                  <div class="app-article-preview" s-if="!loading && articles.length === 0">
                    No articles are here... yet.
                  </div>

                  <nav s-if="!loading">
                    <ul class="pagination" s-if="pageCount > 1">
                      <li s-for="page in pages" on-click="changePage(page)"
                        class="page-item{{page === currentPage ? ' active' : ''}}"
                      >
                        <a class="page-link">{{page + 1}}</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
    `,

    route() {
        let author = this.data.get('route.query.user');

        this.actions.articles({
            author,
            page: 0
        });

        this.actions.fetch(author);
    },

    disposed() {
        this.actions.reset();
    },

    changePage(page) {
        this.data.set('currentPage', page);
        this.actions.articles({
            author: this.data.get('route.query.user'),
            page
        });
    }
}))