import san from 'san';
import { Link } from 'san-router';

export default san.defineComponent({
    components: {
        'x-link': Link
    },

    template: `
      <div class="articles-toggle">
        <ul class="nav nav-pills outline-active">
          <li class="nav-item">
            <x-link to="/profile/{{username}}" class="nav-link" active-class="active">My Articles</x-link>
          </li>
          <li class="nav-item">
            <x-link to="/profile/{{username}}/favorites" class="nav-link" active-class="active">Favorited Articles</x-link>
          </li>
        </ul>
      </div>
    `
})