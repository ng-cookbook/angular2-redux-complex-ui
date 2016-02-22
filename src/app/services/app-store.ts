
import {provide} from 'angular2/core'
import {createStore, applyMiddleware} from 'redux/redux'
import Rx from 'rxjs/Rx'
import * as thunkMiddleware from 'redux-thunk/redux-thunk'

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

function counter(state = 0, action) {
    'use strict';
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

function counterActionCreator() {
    'use strict';
    return dispatch => {
        let list = [true, true, false, true, true];
        Rx.Observable
            .interval(500)
            .take(list.length)
            .map(idx => list[idx])
            .subscribe(incr => {
                dispatch({
                    type: incr ? 'INCREMENT' : 'DECREMENT'
                })
            })
    }
}
