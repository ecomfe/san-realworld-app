import san from 'san';
import ArticleMeta from './meta';



export default san.defineComponent({
    components: {
        'x-meta': ArticleMeta
    },

    template: `
      <div class="article-preview">
        <x-meta article="{{article}}" />

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
    `
})