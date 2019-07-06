import san from 'san';
import { connect } from 'san-store';

export default connect.san(
    {
        errors: 'errors'
    }
)(san.defineComponent({
    template: `
      <ul s-if="errors" class="error-messages">
        <li s-for="v in errors">{{ v }}</li>
      </ul>
    `
}))