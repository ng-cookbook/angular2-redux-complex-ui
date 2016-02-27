
import {provide} from 'angular2/core'
import {createStore, applyMiddleware} from 'redux/redux'
import * as Rx from 'rxjs/Rx'
import * as thunkMiddleware from 'redux-thunk/redux-thunk'

import {counter} from '../reducers/counter'
import {counterActionCreator} from '../actions/counterActions'

export class AppStore {

    private appStore
    private stateObservable

    constructor() {

        this.appStore = createStore(counter, applyMiddleware(thunkMiddleware.default))
        this.stateObservable = Rx.Observable.create(observer => {
            let dispose = this.appStore.subscribe(() => observer.next(this.currentState))
            observer.next(this.currentState)
            return function() {
                console.log('Observer unsubscribed.')
                dispose()
            }
        })

        setTimeout(() => this.appStore.dispatch(counterActionCreator()), 500)
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

export const appStoreInstance = new AppStore()

provide(AppStore, appStoreInstance)
