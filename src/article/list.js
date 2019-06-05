import san from 'san';
import { connect } from 'san-store';
import { Link } from 'san-router';
import { Types as ActionTypes } from './action';
import ArticlePreview from './components/preview';

export default connect.san(
    {
        articles: 'articles', 
        tags: 'tags'
    },
    {
        articles: ActionTypes.FETCH,
        tags: ActionTypes.TAGS
    }
)(san.defineComponent({
    components: {
        'x-preview': ArticlePreview,
        'x-link': Link
    },

    template: `
      <div class="home-page">

        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">

            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <x-link to="/my-feed" class="nav-link" active-class="active">Your Feed</x-link>
                  </li>
                  <li class="nav-item">
                    <x-link to="/" class="nav-link" active-class="active">Global Feed</x-link>
                  </li>
                  <li class="nav-item" s-if="tag">
                    <x-link to="/tag/{{tag}}" class="nav-link" active-class="active"><i class="ion-pound"></i> {{ tag }}</x-link>
                  </li>
                </ul>
              </div>

              <x-preview s-for="article in articles" article="{{article}}"/>

              <div class="app-article-preview" s-if="!loading && articles.length === 0">
                No articles are here... yet.
              </div>

              <nav s-if="!loading">
                <ul class="pagination">
                  <li s-for="page in pages" on-click="changePage(page)"
                    class="page-item{{page === currentPage ? ' active' : ''}}"
                  >
                    <a class="page-link">{{page}}</a>
                  </li>
                </ul>
              </nav>

            </div>


            <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>

                <div class="tag-list">
                  <a href="#/tag/{{tag}}" class="tag-pill tag-default" s-for="tag in tags">{{tag}}</a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `,

    attached() {
        this.actions.articles({page: 0});
        this.actions.tags();
    },

    changePage(page) {
        this.actions.articles({
            page
        });
    }
}))