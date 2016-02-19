
import {Injectable} from 'angular2/core'
import {createStore, applyMiddleware} from 'redux/redux'
import * as thunkMiddleware from 'redux-thunk/redux-thunk'

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
        setTimeout(() => {
            dispatch({ type: 'INCREMENT' })
            setTimeout(() => {
                dispatch({ type: 'INCREMENT' })
                setTimeout(() => {
                    dispatch({ type: 'DECREMENT' })
                }, 1000)
            }, 1000)
        }, 1000)
    }
}

@Injectable()
export class AppStore {
    private appStore

    constructor() {
        this.appStore = createStore(counter, applyMiddleware(thunkMiddleware.default))

        this.appStore.subscribe(() => {
            console.log(this.appStore.getState())
        })

        setTimeout(() => this.testDispatch(), 1000)
    }

    public dispatch(action) {
        this.appStore.dispatch(action)
    }

    public testDispatch() {
        this.appStore.dispatch(counterActionCreator())
    }
}
