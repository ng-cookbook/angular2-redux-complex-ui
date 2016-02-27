
import * as Rx from 'rxjs/Rx'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export function increment() {
    'use strict';
    return {
        type: INCREMENT
    }
}

export function decrement() {
    'use strict';
    return {
        type: DECREMENT
    }
}

export function counterActionCreator() {
    'use strict';
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
