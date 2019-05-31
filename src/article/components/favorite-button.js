import san from 'san';
import {Link} from 'san-router';
import {default as format} from "date-fns/format";



export default san.defineComponent({
    computed: {
        extClass() {
            let classList = [];

            if (this.data.get('isSubmitting')) {
                classList.push('disabled');
            }

            if (this.data.get('article.favorited')) {
                classList.push('btn-primary')
            }
            else {
                classList.push('btn-outline-primary')
            }

            return classList;
        }
    },

    template: `
      <button class="btn btn-sm {{extClass}}" on-click="toggleFavorite">
        <i class="ion-heart"></i> <slot/>
      </button>
    `,

    toggleFavorite() {

    }
})

