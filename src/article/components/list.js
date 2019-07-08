import san from 'san';
import { connect } from 'san-store';
import ArticlePreview from './preview';
import { Types as ActionTypes } from '../action';



export default connect.san(
    {
        articles: 'articles',
        pageCount: 'articlePageCount',
        loading: 'articlesLoading'
    },
    {
        fetch: ActionTypes.FETCH,
    }
)(san.defineComponent({
    components: {
        'x-preview': ArticlePreview
    },

    template: `
      <div>
        <div s-if="loading" class="article-preview">Loading articles...</div>
        <x-preview s-else s-for="article in articles" article="{{article}}" />

        <div class="article-preview" s-if="!loading && articles.length === 0">
          No articles are here... yet.
        </div>

        <nav s-if="!loading && pageCount - 1">
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