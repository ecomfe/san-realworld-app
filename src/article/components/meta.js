import san from 'san';
import { router } from 'san-router';
import {default as format} from "date-fns/format";
import { connect } from 'san-store';
import { Types as ActionTypes } from '../action';
import { Types as ProfileActionTypes } from '../../profile/action';



export default connect.san(
    {
        profile: 'profile',
        user: 'user',
        isAuthenticated: 'isAuthenticated'
    },
    {
        removeArticle: ActionTypes.REMOVE,
        removeFav: ActionTypes.REMOVE_FAVORITE,
        addFav: ActionTypes.ADD_FAVORITE,
        unfollow: ProfileActionTypes.UNFOLLOW,
        follow: ProfileActionTypes.FOLLOW
    }
)(san.defineComponent({
    filters: {
        date(source) {
            return format(new Date(source), "MMMM D, YYYY");
        }
    },

    template: `
      <div class="article-meta">
        <a href="#/profile/{{article.author.username}}">
          <img src="{{article.author.image}}">
        </a>

        <div class="info">
          <a class="author" href="#/profile/{{article.author.username}}">
            {{article.author.username}}
          </a>
          <span class="date">{{article.createdAt | date}}</span>
        </div>

        <span s-if="actions && user.username === article.author.username">
          <a class="btn btn-sm btn-outline-secondary" href="#/editor/{{article.slug}}">
            <i class="ion-edit"></i> <span>&nbsp;Edit Article</span>
          </a>
          <span>&nbsp;&nbsp;</span>
          <button class="btn btn-outline-danger btn-sm" on-click="deleteArticle">
            <i class="ion-trash-a"></i> <span>&nbsp;Delete Article</span>
          </button>
        </span>
        <span s-elif="actions">
          <button class="btn btn-sm btn-outline-secondary" on-click="toggleFollow">
            <i class="ion-plus-round"></i> <span>&nbsp;</span>
            <span>{{profile.following ? 'Unfollow' : 'Follow'}} {{article.author.username}}</span>
          </button>
          <span>&nbsp;&nbsp;</span>
          <button class="btn btn-sm {{article.favorited ? 'btn-primary' : 'btn-outline-primary'}}"
            on-click="toggleFavorite"
          >
            <i class="ion-heart"></i> <span>&nbsp;</span>
            <span>{{article.favorited ? 'Unfavorite' : 'Favorite'}} Article</span> <span>&nbsp;</span>
            <span class="counter">({{article.favoritesCount}})</span>
          </button>
        </span>
        <button s-else on-click="toggleFavorite"
            class="btn btn-sm pull-xs-right {{article.favorited ? 'btn-primary' : 'btn-outline-primary'}}">
          <i class="ion-heart"></i>
          <span class="counter"> {{ article.favoritesCount }} </span>
        </button>
      </div>
    `,

    toggleFavorite() {
        if (!this.data.get('isAuthenticated')) {
            router.locator.redirect('/login');
            return;
        }

        let favorited = this.data.get('article.favorited');
        this.actions[favorited ? 'removeFav' : 'addFav'](this.data.get('article.slug'));
    },

    toggleFollow() {
        if (!this.data.get('isAuthenticated')) {
            router.locator.redirect('/login');
            return;
        }

        let following = this.data.get('article.following');
        this.actions[following ? 'unfollow' : 'follow']({
            username: this.data.get('article.author')
        });
    },

    deleteArticle() {
        this.actions.removeArticle(this.data.get('article.slug')).then(() => {
            router.locator.redirect('/');
        });
    }
}))