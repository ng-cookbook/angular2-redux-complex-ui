
import {OpaqueToken} from '@angular/core'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {Observable} from 'rxjs/Observable'
import thunkMiddleware from 'redux-thunk'

interface DevToolsWindow extends Window {
    devToolsExtension: any
}

declare var window: DevToolsWindow;

export const APP_STORE_REDUCERS: OpaqueToken = new OpaqueToken('AppStoreReducers')

export class AppStore {

    public static instance: AppStore

    private appStore
    private stateObservable

    constructor(reducer) {

        this.appStore = createStore(reducer, compose(
            applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ))

        this.stateObservable = Observable.create(observer => {
            let dispose = this.appStore.subscribe(() => observer.next(this.currentState))
            observer.next(this.currentState)
            return function() {
                dispose()
            }
        })

    }

    public dispatch(action) {
        this.appStore.dispatch(action)
    }

    public get source() {
        return this.stateObservable;
    }

    public get currentState() {
        return this.appStore.getState();
    }
}

export function provideAppStore() {
    return {
        provide: AppStore,
        useFactory: reducers => {
            let combinedReducers = reducers.reduce((combined, reducer) => Object.assign(combined, reducer), {})
            AppStore.instance = new AppStore(combineReducers(combinedReducers))
            return AppStore.instance
        },
        deps: [APP_STORE_REDUCERS]
    }
}

export function provideReducer(stateName: string, reducer: (state: any, action: any) => any) {
    return {
        provide: APP_STORE_REDUCERS,
        useValue: {
            [stateName]: reducer
        },
        multi: true
    }
}
