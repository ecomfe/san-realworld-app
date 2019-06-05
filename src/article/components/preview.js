import san from 'san';
import ArticleMeta from './meta';
import FavoriteButton from './favorite-button';



export default san.defineComponent({
    components: {
        'x-meta': ArticleMeta,
        'x-favbtn': FavoriteButton
    },

    template: `
      <div class="article-preview">
        <x-meta article="{{article}}">
          <x-favbtn article="{{article}}" on-toggle="onToggleFavorite($event)" class="pull-xs-right">
            {{article.favoritesCount}}
          </x-favbtn>
        </x-meta>

        <a href="#/article/{{article.slug}}" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            <li class="tag-default tag-pill tag-outline" s-for="tag in article.tagList">
              {{ tag }}
            </li>
          </ul>
        </a>
      </div>
    `,

    onToggleFavorite(e) {

    }
})