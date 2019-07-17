import san from 'san';
import { Link } from 'san-router';
import { connect } from 'san-store';

export default connect.san(
    {
        isAuthenticated: 'isAuthenticated',
        user: 'user'
    }
)(san.defineComponent({
    components: {
        'x-link': Link
    },

    template: `
      <div class="container">
        <x-link to="/" class="navbar-brand">conduit</x-link>

        <!-- Show this for logged in users -->
        <ul s-if="isAuthenticated" class="nav navbar-nav pull-xs-right">
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
            <x-link to="/profile/{{user.username}}" class="nav-link" active-class="active">
              <img src="{{user.image}}" className="user-pic" alt="{{user.username}}" s-if="user.image">
              {{user.username}}
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
    `
}))