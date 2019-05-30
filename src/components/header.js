import san from 'san';
import {Link} from 'san-router';

export default san.defineComponent({
    components: {
        'x-link': Link
    },

    template: `
        <nav class="navbar navbar-light">
          <div class="container">
            <x-link to="/" class="navbar-brand">conduit</x-link>

            <!-- Show this for logged in users -->
            <ul s-if="currentUser" class="nav navbar-nav pull-xs-right">
              <li class="nav-item">
                <x-link to="/" class="nav-link" active-class="active">Home</x-link>
              </li>

              <li className="nav-item">
                <x-link to="/editor" class="nav-link" active-class="active"><i className="ion-compose"></i>&nbsp;New Post</x-link>
              </li>

              <li className="nav-item">
                <x-link to="/settings" class="nav-link" active-class="active"><i className="ion-gear-a"></i>&nbsp;Settings</x-link>
              </li>

              <li className="nav-item">
                <x-link to="/{{currentUser.username}}" class="nav-link" active-class="active">
                  <img src="{{currentUser.image}}" className="user-pic" alt="{{currentUser.username}}">
                  {{currentUser.username}}
                </x-link>
              </li>
            </ul>

            <!-- Show this for logged out users -->
            <ul s-else class="nav navbar-nav pull-xs-right">
              <li class="nav-item">
                <x-link to="/" class="nav-link" active-class="active">Home</x-link>
              </li>

              <li class="nav-item">
                <x-link to="/login" class="nav-link" active-class="active">Sign in</x-link>
              </li>

              <li class="nav-item">
                <x-link to="/register" class="nav-link" active-class="active">Sign up</x-link>
              </li>
            </ul>
          </div>
        </nav>
    `
})