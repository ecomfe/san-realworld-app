import san from 'san';
import { router } from 'san-router';
import { connect } from 'san-store';
import { Types } from './action';
import ErrorsView from '../common/components/errors';

export default connect.san(
    {},
    { login: Types.LOGIN }
)(san.defineComponent({
    template: `
        <div class="auth-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign in</h1>
                <p class="text-xs-center">
                  <a href="#/register">Need an account?</a>
                </p>
                <x-errors />
                <form on-submit="onSubmit($event)">
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="text" value="{=email=}" placeholder="Email">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="password" value="{=password=}" placeholder="Password">
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    `,

    onSubmit(e) {
        let {email, password} = this.data.get();
        this.actions.login({email, password}).then(data => {
            if (data.user) {
                router.locator.redirect('/');
            }
        });

        e.preventDefault();
    }
}))