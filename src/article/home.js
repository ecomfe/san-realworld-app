import san from 'san';
import { connect } from 'san-store';
import { Link } from 'san-router';
import { Types as ActionTypes } from './action';
import ArticleList from './components/list';

export default connect.san(
    {
        tags: 'tags',
        isAuthenticated: 'isAuthenticated'
    },
    {
        tags: ActionTypes.TAGS
    }
)(san.defineComponent({
    components: {
        'x-list': ArticleList,
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
                  <li class="nav-item" s-if="isAuthenticated">
                    <x-link to="/my-feed" class="nav-link" active-class="active">Your Feed</x-link>
                  </li>
                  <li class="nav-item">
                    <x-link to="/" class="nav-link" active-class="active">Global Feed</x-link>
                  </li>
                  <li class="nav-item" s-if="route.query.tag">
                    <x-link to="/tag/{{route.query.tag}}" class="nav-link" active-class="active"><i class="ion-pound"></i> {{route.query.tag}}</x-link>
                  </li>
                </ul>
              </div>

              <x-list feed="{{route.path === '/my-feed'}}" tag="{{route.query.tag}}" />
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
        this.actions.tags();
    }
}))