declare module 'san-update' {
    export interface UpdateBuilder {
        set(expr: string, value: any): UpdateBuilder;
        push(expr: string, value: any): UpdateBuilder;
        remove(expr: string, value: any): UpdateBuilder;
    }

    export function updateBuilder(): UpdateBuilder;
}