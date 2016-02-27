
import * as Rx from 'rxjs/Rx'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}

export function counterActionCreator() {
    return dispatch => {
        let list = [true, true, false, true, true];
        Rx.Observable
            .interval(500)
            .take(list.length)
            .map(idx => list[idx])
            .subscribe(incr => {
                let action = incr ? increment() : decrement()
                dispatch(action)
            })
    }
}
