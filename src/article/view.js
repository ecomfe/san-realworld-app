import san from 'san';
import marked from "marked";
import { connect } from 'san-store';
import { Types as ActionTypes } from './action';
import CommentEditor from './components/comment-editor';
import ArticleMeta from './components/meta';


export default connect.san(
    {
        comments: 'comments', 
        article: 'article',
        isAuthenticated: 'isAuthenticated',
        user: 'user'
    },
    {
        get: ActionTypes.GET,
        getComments: ActionTypes.GET_COMMENTS,
        removeComment: ActionTypes.REMOVE_COMMENT
    }
)(san.defineComponent({
    components: {
        'x-meta': ArticleMeta,
        'x-comment-editor': CommentEditor
    },

    filters: {
        marked(source) {
            return marked(source || '');
        }
    },

    route() {
        let slug = this.data.get('route.query.slug');
        this.actions.get(slug);
        this.actions.getComments(slug);
    },


    template: `
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1>{{ article.title }}</h1>
            <x-meta article="{{article}}" actions="{{true}}"/>
          </div>
        </div>
        <div class="container page">
          <div class="row article-content">
            <div class="col-xs-12">
              <div>{{article.body | marked | raw}}</div>
              <ul class="tag-list">
                <li s-for="tag in article.tagList">
                  <a href="#/tag/{{tag}}" class="tag-default tag-pill tag-outline">{{tag}}</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div class="article-actions">
            <x-meta article="{{article}}" actions="{{true}}"/>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              <x-comment-editor s-if="isAuthenticated" slug="{{route.query.slug}}" user-image="{{user.image}}" />
              <p s-else>
                <a href="#/login">Sign in</a>
                or
                <a href="#/register">sign up</a>
                to add comments on this article.
              </p>

              <div class="card" s-for="comment in comments">
                <div class="card-block">
                  <p class="card-text">{{comment.body}}</p>
                </div>
                <div class="card-footer">
                  <a href="" class="comment-author">
                    <img src="{{comment.author.image}}" class="comment-author-img" />
                  </a>
                  <a class="comment-author" href="#/profile/{{comment.author.username}}">
                    {{comment.author.username}}
                  </a>
                  <span class="date-posted">{{ comment.createdAt | date }}</span>
                  <span s-if="comment.author.username === user.username" class="mod-options">
                    <i class="ion-trash-a" on-click="removeComment(route.query.slug, comment.id);"></i>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `,

    removeComment(slug, commentId) {
        this.actions.removeComment({slug, commentId})
    }
}))