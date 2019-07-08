import san from 'san';
import { connect } from 'san-store';
import { Types as ActionTypes } from './action';
import UserInfo from './components/user-info';
import Nav from './components/nav';
import ArticleList from '../article/components/list';

export default connect.san(
    {
        profile: 'profile',
        user: 'user'
    },
    {
        fetch: ActionTypes.FETCH,
        reset: ActionTypes.RESET
    }
)(san.defineComponent({

    components: {
        'x-articles': ArticleList,
        'x-userinfo': UserInfo,
        'x-nav': Nav
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
                <x-nav username="{{route.query.user}}" />
                <x-articles favorited="{{route.query.user}}" />
              </div>
            </div>
          </div>
        </div>
    `,

    route() {
        let favorited = this.data.get('route.query.user');

        this.actions.fetch(favorited);
    },

    disposed() {
        this.actions.reset();
    }
}))