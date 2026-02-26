import { store } from 'san-store';
import { updateBuilder } from 'san-update';


export const Types = {
    ERRORS_CLEAR: 'errorClear' as const,
    ERRORS_SET: 'errorSet' as const
};

store.addAction(Types.ERRORS_CLEAR, function () {
    return updateBuilder().set('errors', null);
});

store.addAction(Types.ERRORS_SET, function (errors: Record<string, string[]>) {
    let formattedErrors: string[] | undefined;
    if (errors) {
        formattedErrors = Object.keys(errors)
            .map(key => `${key} ${errors[key]}`);
    }

    return updateBuilder().set('errors', formattedErrors);
});

export function whenNoError<T>(fn?: (data: T) => void): (result: { data?: T; errors?: Record<string, string[]> }) => T {
    return function ({data, errors}: {data?: T; errors?: Record<string, string[]>}): T {
        if (errors) {
            store.dispatch(Types.ERRORS_SET, errors);
        }
        else if (typeof fn === 'function'){
            fn(data as T);
        }

        return data as T;
    };
}