import san from 'san';
import {Link} from 'san-router';
import {default as format} from "date-fns/format";



export default san.defineComponent({
    components: {
        'x-link': Link
    },

    filters: {
        date(source) {
            return format(new Date(source), "MMMM D, YYYY");
        }
    },

    template: `
      <div class="article-meta">
        <x-link to="/profile/{{article.author.username}}">
          <img src="{{article.author.image}}">
        </x-link>

        <div class="info">
          <x-link class="author" to="/profile/{{article.author.username}}">
            {{article.author.username}}
          </x-link>
          <span class="date">{{article.createdAt | date}}</span>
        </div>

        <slot/>
      </div>
    `
})