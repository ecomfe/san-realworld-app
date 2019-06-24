import san from 'san';
import { connect } from 'san-store';

export default connect.san(
    {
        errors: 'errors'
    }
)(san.defineComponent({
    template: `
      <ul s-if="errors" class="error-messages">
        <li s-for="v, k in errors">{{ k }} {{ v }}</li>
      </ul>
    `
}))