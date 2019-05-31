import san from 'san';
import {Link} from 'san-router';

export default san.defineComponent({
    components: {
        'x-link': Link
    },

    template: `
      <div class="container">
        <x-link to="/" class="logo-font">conduit</x-link>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    `
})