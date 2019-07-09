import san from 'san';
import { connect } from 'san-store';
import ArticleMeta from './meta';
import { Types as ActionTypes } from '../action';



export default connect.san(
    {
        articles: 'articles',
        pageCount: 'articlePageCount',
        loading: 'articlesLoading'
    },
    {
        fetch: ActionTypes.FETCH
    }
)(san.defineComponent({
    components: {
        'x-meta': ArticleMeta
    },

    template: `
      <div>
        <div s-if="loading" class="article-preview">Loading articles...</div>
        <div s-else s-for="article in articles" class="article-preview">
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

        <div class="article-preview" s-if="!loading && articles.length === 0">
          No articles are here... yet.
        </div>

        <nav s-if="!loading && pageCount > 1">
          <ul class="pagination">
            <li s-for="page in pages" on-click="changePage($event, page)"
              class="page-item{{page === currentPage ? ' active' : ''}}"
            >
              <a class="page-link" href="">{{page + 1}}</a>
            </li>
          </ul>
        </nav>
      </div>
    `,

    computed: {
        pages() {
            let pageCount = this.data.get('pageCount');

            if (pageCount) {
                let result = [];
                for (let i = 0; i < pageCount; i++) {
                    result.push(i);
                }

                return result;
            }

            return [0];
        }
    },

    attached() {
        this.change = () => {
            this.updateFromOwner = true;
        };

        this.watch('feed', this.change);
        this.watch('tag', this.change);

        this.fetch(0);
    },

    fetch(page) {
        let {favorited, author, tag, feed} = this.data.get();
        this.data.set('currentPage', page);

        this.actions.fetch({
            favorited,
            author,
            tag,
            feed,
            page
        });
    },

    changePage(e, page) {
        e.preventDefault();
        this.fetch(page);
    },

    updated() {
        if (this.updateFromOwner) {
            this.updateFromOwner = false;
            this.fetch(0);
        }
    }
}))