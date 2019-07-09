import san from 'san';
import { router } from 'san-router';
import { connect } from 'san-store';
import { Types as ActionTypes } from './action';
import ErrorsView from '../common/components/errors';

export default connect.san(
    {
        article: 'article',
        isAuthenticated: 'isAuthenticated'
    },
    {
        reset: ActionTypes.RESET,
        add: ActionTypes.ADD,
        edit: ActionTypes.EDIT,
        get: ActionTypes.GET,
        addTag: ActionTypes.ADD_TAG,
        removeTag: ActionTypes.REMOVE_TAG
    }
)(san.defineComponent({
    components: {
        'x-errors': ErrorsView
    },

    template: `
        <div class="editor-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-10 offset-md-1 col-xs-12">
                <x-errors />
                <form on-submit="onPublish">
                  <fieldset disabled="{{inProgress}}">
                    <fieldset class="form-group">
                      <input type="text" class="form-control form-control-lg" value="{=article.title=}" placeholder="Article Title">
                    </fieldset>
                    <fieldset class="form-group">
                      <input type="text" class="form-control" value="{=article.description=}" placeholder="What's this article about?">
                    </fieldset>
                    <fieldset class="form-group">
                      <textarea class="form-control" rows="8" value="{=article.body=}"
                        placeholder="Write your article (in markdown)"
                      >
                      </textarea>
                    </fieldset>
                    <fieldset class="form-group">
                      <input type="text" class="form-control" placeholder="Enter tags" value="{=tagInput=}" on-keypress="addTag">
                      <div class="tag-list">
                        <span class="tag-default tag-pill" s-for="tag in article.tagList">
                          <i class="ion-close-round" on-click="removeTag(tag)"></i>
                          {{ tag }}
                        </span>
                      </div>
                    </fieldset>
                  </fieldset>
                  <button disabled="{{inProgress}}" class="btn btn-lg pull-xs-right btn-primary">
                    Publish Article
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    `,

    route() {
        let slug = this.data.get('route.query.slug');

        if (slug) {
            this.actions.get(slug);
        }
    },

    disposed() {
        this.actions.reset();
    },

    onPublish(e) {
        e.preventDefault();
        this.data.set('inProgress', true);

        let slug = this.data.get('route.query.slug');
        this.actions[slug ? 'edit' : 'add'](this.data.get('article'))
            .then(data => {
                if (data.errors) {
                    this.data.set('inProgress', null);
                    return;
                }

                router.locator.redirect(`/article/${data.article.slug}`);
            });
    },

    addTag(e) {
        if ((e.which || e.keyCode) === 13) {
            e.preventDefault();
            let tagInput = this.data.get('tagInput');

            if (tagInput) {
                this.actions.addTag(tagInput);
            }

            this.data.set('tagInput', '');
        }
    },

    removeTag(tag) {
        this.actions.removeTag(tag);
    }
}))