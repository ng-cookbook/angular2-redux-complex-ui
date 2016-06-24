
import {Provider} from '@angular/core'
import {OpaqueToken} from '@angular/router-deprecated'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import * as Rx from 'rxjs/Rx'
import thunkMiddleware from 'redux-thunk'

export const APP_STORE_REDUCERS: OpaqueToken = new OpaqueToken('AppStoreReducers')

export class AppStore {

    public static instance: AppStore

    private appStore
    private stateObservable

    constructor(reducer) {

        this.appStore = createStore(reducer, applyMiddleware(thunkMiddleware))
        this.stateObservable = Rx.Observable.create(observer => {
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
    return new Provider(AppStore, {
        useFactory: reducers => {
            let combinedReducers = reducers.reduce((combined, reducer) => Object.assign(combined, reducer), {})
            AppStore.instance = new AppStore(combineReducers(combinedReducers))
            return AppStore.instance
        },
        deps: [APP_STORE_REDUCERS]
    })
}

export function provideReducer(stateName: string, reducer: (state: any, action: any) => any) {
    return new Provider(APP_STORE_REDUCERS, {
        useValue: {
            [stateName]: reducer
        },
        multi: true
    })
}
