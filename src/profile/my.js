import san from 'san';
import { connect } from 'san-store';
import { Types as ActionTypes } from './action';
import UserInfo from './components/user-info';
import Nav from './components/nav';
import Articles from './components/articles';

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
        'x-articles': Articles,
        'x-userinfo': UserInfo,
        'x-nav': Nav
    },

    template: `
        <div class="profile-page">
          <x-userinfo is-self="{{user.username === profile.username}}" profile="{{profile}}" />

          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <x-nav username="{{route.query.user}}" />
                <x-articles author="{{route.query.user}}" />
              </div>
            </div>
          </div>
        </div>
    `,

    route() {
        let author = this.data.get('route.query.user');

        this.actions.fetch(author);
    },

    disposed() {
        this.actions.reset();
    }
}))