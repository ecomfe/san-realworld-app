import san from 'san';
import { Link, router } from 'san-router';
import { connect } from 'san-store';
import { Types } from './action';
import ErrorsView from '../common/components/errors';

export default connect.san(
    {
        isAuthenticated: 'isAuthenticated',
        user: 'user'
    },
    {
        register: Types.REGISTER
    }
)(san.defineComponent({
    components: {
        'x-link': Link,
        'x-errors': ErrorsView
    },

    template: `
        <div class="auth-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                  <x-link to="/login">Have an account?</x-link>
                </p>
                <x-errors />
                <form>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="text" value="{=username=}" placeholder="Username">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="text" value="{=email=}" placeholder="Email">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="password" value="{=password=}" placeholder="Password">
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right" type="button" on-click="onSubmit">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    `,

    onSubmit() {
        let {username, email, password} = this.data.get();
        this.actions.register({username, email, password}).then(() => {
            router.locator.redirect('/');
        });
    }
}))