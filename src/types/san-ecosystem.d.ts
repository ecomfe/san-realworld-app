// San.js 生态系统类型定义补充
// 这些类型定义用于填补第三方库可能缺失的类型

declare module 'san-router' {
    import { Component } from 'san';

    export interface RouterOptions {
        html5?: boolean;
    }

    export interface RouteConfig {
        rule: string;
        Component: typeof Component;
        [key: string]: any;
    }

    export interface Route {
        path: string;
        query: Record<string, string>;
        data: any;
    }

    export interface RouterEventArg {
        type: string;
        path: string;
        query: Record<string, string>;
        data: any;
    }

    export const router: {
        add(config: RouteConfig | RouteConfig[]): void;
        listen(handler: (e: RouterEventArg) => void): void;
        start(): void;
        push(path: string, query?: Record<string, string>): void;
        replace(path: string, query?: Record<string, string>): void;
    };

    export class Link<P = {}, D = {}> extends Component<P, D> {
        to: string;
        activeClass?: string;
    }
}

declare module 'san-store' {
    import { Component, Data } from 'san';

    export type Store = {
        dispatch(actionName: string, payload?: any): void;
        getState(key?: string): any;
    };

    export interface Connector {
        san<S, A>(
            stateMap?: Record<string, string>,
            actionMap?: Record<string, string>
        ): any;
    }

    export const store: Store;
    export const connect: Connector;
}

declare module 'san-update' {
    export interface UpdateCommand {
        $set?: any;
        $push?: any;
        $unshift?: any;
        $pop?: boolean;
        $shift?: boolean;
        $splice?: any[];
        $merge?: any;
        $defaults?: any;
        $apply?: (value: any) => any;
        $omit?: boolean;
        $map?: (value: any) => any;
        $filter?: (value: any) => any;
        $reduce?: [any, any?];
        [key: string]: any;
    }

    export interface UpdateBuilder {
        set(path: string, value: any): UpdateBuilder;
        push(path: string, value: any): UpdateBuilder;
        unshift(path: string, value: any): UpdateBuilder;
        pop(path: string): UpdateBuilder;
        shift(path: string): UpdateBuilder;
        splice(path: string, ...args: any[]): UpdateBuilder;
        merge(path: string, value: any): UpdateBuilder;
        defaults(path: string, value: any): UpdateBuilder;
        apply(path: string, fn: (value: any) => any): UpdateBuilder;
        omit(path: string): UpdateBuilder;
        map(path: string, fn: (value: any) => any): UpdateBuilder;
        filter(path: string, fn: (value: any) => any): UpdateBuilder;
        value(): any;
    }

    export const updateBuilder: () => UpdateBuilder;
}
