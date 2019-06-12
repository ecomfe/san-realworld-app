import san from 'san';
import { router } from 'san-router';
import { connect } from 'san-store';
import { Types } from './action';

export default connect.san(
    {
        isAuthenticated: 'isAuthenticated',
        user: 'user',
        errors: 'errors'
    },
    {
        logout: Types.PURGE_AUTH,
        updateUser: Types.UPDATE
    }
)(san.defineComponent({
    template: `
        <div class="settings-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Your Settings</h1>
                <form>
                  <fieldset>
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
                    <button class="btn btn-lg btn-primary pull-xs-right" type="button" on-click="updateSettings">Update Settings</button>
                  </fieldset>
                </form>

                <hr />
                <button on-click="logout" class="btn btn-outline-danger">Or click here to logout.</button>
              </div>
            </div>
          </div>
        </div>
    `,

    updateSettings() {
        this.actions.updateUser(this.data.get('user'));
    },

    logout() {
        this.watch('isAuthenticated', () => {
            router.locator.redirect('/');
        });

        this.actions.logout();
    }
}))