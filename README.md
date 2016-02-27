
# Angular/Redux with Decorators Example
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Example of using Angular2 and Redux with Application Store subscription decorators.

## Building and Running

```
git clone https://github.com/dfbaskin/angular2-redux-decorators-example.git
cd angular2-redux-decorators-example
npm install
npm run build
npm run web
```

Then navigate to `http://localhost:9988/`

## App Store Subscriber Component

This example demonstrates a simple implementation of using Angular2 and Redux together. Angular components that
use the Redux Application Store need to subscribe to state changes from the store and make sure
these subscriptions are released when the component is destroyed. As an experiment, I created a
decorator that could be used to automate this process.

The decorator can be applied to components that need a state subscription. The component must then
implement a single method that receives an `Observable` source object of the state changes and must
return the subscription.

```typescript
@AppStoreSubscriber()
export class MyComponent implements IAppStoreSubscriber {

    public onInitAppStoreSubscription(source: any): void {
        return source
            .subscribe((state) => {
                // do something with the status object ...
            })
    }
}
```

The decorator itself ([app-store-subscriber.ts](src/app/decorators/app-store-subscriber.ts))
then hooks into the Angular life-cycle events, `ngOnInit` and `ngOnDestroy`, to wire up
the call to the `onInitAppStoreSubscription` method and unsubscribe
from the `Observable` when the component is destroyed.

## Building the App Store

Subscribing to changes in the App Store state is one part of the puzzle.  The other part is building
the App Store in the first place. Angular can provide the App Store as a service, but the
dependencies for this service are the reducers that should be combined and used as input
to the Redux `createStore` function.

Fortunately, a feature of Angular2's dependency injection functionality is the ability to provide
multiple values for a particular token (called
[Multi Providers](http://blog.thoughtram.io/angular2/2015/11/23/multi-providers-in-angular-2.html)).
This gives a technique for our application to provide a number of reducers that will be combined
together using the Redux `combineReducers` function.

There are no requirements on the reducer itself, it's just a normal Redux reducer.

```typescript
export function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}
```

The App Store service publishes two provider functions, `provideAppStore` and `provideReducer`.
These are used when bootstrapping the Angular application and specifying its dependencies.

```typescript
import {provideAppStore, provideReducer} from './services/app-store'
import {counter} from './reducers/counter'

bootstrap(DemoApp, [
    provideReducer('counter', counter),
    provideAppStore()
])
```

The `provideReducer` function takes the name of the property within the overall application
state object that will be used by the reducer and of course the reducer itself. It creates
a `Provider` object that Angular2 uses.  In the above example, I'm only specifying a
single reducer, but the `provideReducer` function can be used multiple times because
it is providing multiple values for the "reducers" dependency (associated with
the `APP_STORE_REDUCERS` token, below).

All of the reducers are then combined together in a factory provider for the App
Store itself.

```typescript
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
```

## Long Running Process

For this example application, a half-second interval is used to dispatch a few actions. There are a number of
ways to handle long-running processes in Redux, but this example uses the `redux-thunk` package and RxJS.
The `counterActionCreator` is an Action Creator that starts an interval and then dispatches `increment` or
`decrement` actions.

```typescript
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
```

Personally, I like being able to orchestrate asynchronous operations with Observables. And Action
Creators like this can be easily tested as well.

## Feedback

Let me know your thoughts on this technique.  If it makes sense to folks, I'll get this functionality set
up as its own installable NPM module.
