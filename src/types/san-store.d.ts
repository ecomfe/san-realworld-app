// Custom type definitions for san-store that include .san() method
// This replaces the built-in types from san-store package

declare module 'san-store' {
    export interface Store {
        log: boolean;
        name?: string;
        id: string;
        getState(name: string): any;
        listen(listener: (changes: any) => void): void;
        unlisten(listener: (changes: any) => void): void;
        addAction(name: string, action: Action): void;
        dispatch(name: string, payload?: any): any;
    }

    export interface ActionContext {
        getState?: (key: string) => any;
        dispatch?: (type: string, payload?: any) => any;
    }

    // Use any return type to be compatible with san-update's UpdateBuilder
    export type Action = (payload?: any, context?: ActionContext) => any;

    export interface ConnectFunction {
        (mapStates?: any, mapActions?: any): Connector;
        san(mapStates?: any, mapActions?: any): Connector;
    }

    export interface Connector {
        (ComponentClass: any): any;
    }

    export const connect: ConnectFunction;

    export const store: Store;
}