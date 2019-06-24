import san from 'san';
import { connect } from 'san-store';
import { Types as ActionTypes } from '../action';
import ErrorsView from '../../common/components/errors';


export default connect.san(
    {
    },
    {
        submit: ActionTypes.ADD_COMMENT
    }
)(san.defineComponent({
    components: {
        'x-errors': ErrorsView
    },

    template: `
      <div>
        <x-errors />
        <form class="card comment-form">
          <div class="card-block">
            <textarea class="form-control" value="{=comment=}" placeholder="Write a comment..." rows="3">
            </textarea>
          </div>
          <div class="card-footer">
            <img src="{{userImage}}" class="comment-author-img" />
            <button class="btn btn-sm btn-primary" on-click="postComment">Post Comment</button>
          </div>
        </form>
      </div>
    `,

    postComment() {
        let {slug, comment} = this.data.get();

        if (slug && comment) {
            this.actions.submit(slug, comment);
            this.data.set('comment', '');
        }
    }
}))