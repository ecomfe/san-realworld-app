import san from 'san';
import { router } from 'san-router';
import { connect } from 'san-store';
import { Types } from './action';
import ErrorsView from '../common/components/errors';

export default connect.san(
    {
        isAuthenticated: 'isAuthenticated',
        user: 'user'
    },
    {
        logout: Types.PURGE_AUTH,
        updateUser: Types.UPDATE
    }
)(san.defineComponent({
    components: {
        'x-errors': ErrorsView
    },

    template: `
        <div class="settings-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Your Settings</h1>
                <x-errors />
                <form on-submit="updateSettings">
                  <fieldset disabled="{{inProgress}}">
                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="text" value="{=user.image=}" placeholder="URL of profile picture">
                    </fieldset>
                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="text" value="{=user.username=}" placeholder="Your username">
                    </fieldset>
                    <fieldset class="form-group">
                      <textarea class="form-control form-control-lg" rows="8" value="{=user.bio=}" placeholder="Short bio about you"></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="text" value="{=user.email=}" placeholder="Email">
                    </fieldset>
                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="password" value="{=user.password=}" placeholder="Password">
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right" disabled="{{inProgress}}">Update Settings</button>
                  </fieldset>
                </form>

                <hr />
                <button on-click="logout" class="btn btn-outline-danger">Or click here to logout.</button>
              </div>
            </div>
          </div>
        </div>
    `,

    updateSettings(e) {
        e.preventDefault();

        this.data.set('inProgress', true);
        this.actions.updateUser(this.data.get('user')).then(() => {
            this.data.set('inProgress', null);
        });
    },

    logout() {
        this.actions.logout();
        router.locator.redirect('/');
    }
}))