import san from 'san';
import { connect } from 'san-store';
import { Types as ActionTypes } from '../action';



export default connect.san(
    {},
    {
        unfollow: ActionTypes.UNFOLLOW,
        follow: ActionTypes.FOLLOW
    }
)(san.defineComponent({
    template: `
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img src="{{ profile.image }}" class="user-img">
              <h4>{{ profile.username }}</h4>
              <p>{{ profile.bio }}</p>
              <div s-if="isSelf">
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
    `,

    unfollow() {
        this.actions.unfollow(this.data.get('profile.username'));
    },

    follow() {
        this.actions.follow(this.data.get('profile.username'));
    },
}))