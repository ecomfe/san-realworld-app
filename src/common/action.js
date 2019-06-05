import { store } from 'san-store';
import { updateBuilder } from 'san-update';


export const Types = {
    ERRORS_CLEAR: 'errorClear',
    ERRORS_SET: 'errorSet'
};

store.addAction(Types.ERRORS_CLEAR, function () {
    return updateBuilder().set('errors', null);
});

store.addAction(Types.ERRORS_SET, function (errors) {
    var formattedErrors;
    if (errors) {
        formattedErrors = Object.keys(errors)
            .map(key => `${key} ${errors[key]}`);
    }

    return updateBuilder().set('errors', formattedErrors);
});