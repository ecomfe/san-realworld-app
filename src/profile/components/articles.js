import san from 'san';
import { connect } from 'san-store';
import ArticlePreview from '../../article/components/preview';
import { Types as ArticleActionTypes } from '../../article/action';



export default connect.san(
    {
        articles: 'articles',
        pageCount: 'articlePageCount',
    },
    {
        fetch: ArticleActionTypes.FETCH,
    }
)(san.defineComponent({
    components: {
        'x-preview': ArticlePreview
    },

    template: `
      <div class="profile-page">
        <x-preview s-for="article in articles" article="{{article}}"/>

        <div class="app-article-preview" s-if="!loading && articles.length === 0">
          No articles are here... yet.
        </div>

        <nav s-if="!loading">
          <ul class="pagination">
            <li s-for="page in pages" on-click="changePage(page)"
              class="page-item{{page === currentPage ? ' active' : ''}}"
            >
              <a class="page-link">{{page + 1}}</a>
            </li>
          </ul>
        </nav>
      </div>
    `,

    initData() {
        return {
            loading: true,
            currentPage: 0
        };
    },

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
        let {favorited, author} = this.data.get();

        this.actions.fetch({
            favorited,
            author,
            page: 0
        });
    },

    changePage(page) {
        let {favorited, author} = this.data.get();
        this.data.set('currentPage', page);

        this.actions.articles({
            favorited,
            author,
            page
        });
    }
}))