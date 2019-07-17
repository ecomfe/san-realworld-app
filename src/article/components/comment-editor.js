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
        <form class="card comment-form" on-submit="postComment">
          <div class="card-block">
            <textarea class="form-control" value="{=comment=}" placeholder="Write a comment..." rows="3" disabled="{{inProgress}}">
            </textarea>
          </div>
          <div class="card-footer">
            <img src="{{userImage}}" class="comment-author-img" s-if="userImage">
            <button class="btn btn-sm btn-primary" disabled="{{inProgress}}">Post Comment</button>
          </div>
        </form>
      </div>
    `,

    postComment(e) {
        let {slug, comment} = this.data.get();

        if (slug && comment) {
            this.data.set('inProgress', true);
            this.actions.submit({slug, comment}).then(() => {
                this.data.set('comment', '');
                this.data.set('inProgress', false);
            });
            
        }

        e.preventDefault();
    }
}))