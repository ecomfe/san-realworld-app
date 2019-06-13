import san from 'san';
import { Link, router } from 'san-router';
import { connect } from 'san-store';
import { Types as ArcitleActionTypes } from '../article/action';
import { Types as ActionTypes } from './action';
import ArticlePreview from '../article/components/preview';

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
        follow: ActionTypes.FOLLOW,
        unfollow: ActionTypes.UNFOLLOW
    }
)(san.defineComponent({

    components: {
        'x-preview': ArticlePreview,
        'x-link': Link
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
          <div class="user-info">
            <div class="container">
              <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                  <img src="{{profile.image}}" class="user-img">
                  <h4>{{profile.username}}</h4>
                  <p>{{profile.bio}}</p>
                  <div s-if="user.username === profile.username">
                    <a class="btn btn-sm btn-outline-secondary action-btn" href="#/settings">
                      <i class="ion-gear-a"></i> Edit Profile Settings
                    </a>
                  </div>
                  <div s-else>
                    <button class="btn btn-sm btn-secondary action-btn" s-if="profile.following" on-click="unfollow">
                      <i class="ion-plus-round"></i> &nbsp;Unfollow
                      {{ profile.username }}
                    </button>
                    <button class="btn btn-sm btn-outline-secondary action-btn" s-else on-click="follow">
                      <i class="ion-plus-round"></i> &nbsp;Follow
                      {{ profile.username }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

    unfollow() {
        this.actions.unfollow(this.data.get('route.query.user'));
    },

    follow() {
        this.actions.follow(this.data.get('route.query.user'));
    },

    changePage(page) {
        this.data.set('currentPage', page);
        this.actions.articles({
            author: this.data.get('route.query.user'),
            page
        });
    }
}))