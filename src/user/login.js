import san from 'san';
import {Link} from 'san-router';

export default san.defineComponent({
    components: {
        'x-link': Link
    },

    template: `
        <div class="auth-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign in</h1>
                <p class="text-xs-center">
                  <x-link to="/register">Need an account?</x-link>
                </p>
                <ul s-if="errors" class="error-messages">
                  <li s-for="v, k in errors">{{ k }} {{ v }}</li>
                </ul>
                <form>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="text" value="{=email=}" placeholder="Email">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="password" value="{=password=}" placeholder="Password">
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right" type="button" on-click="onSubmit">Sign in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    `,

    onSubmit() {
      let {email, password} = this.data.get();
    }
})