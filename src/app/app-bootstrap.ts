
import {bootstrap} from 'angular2/platform/browser'
import {DemoApp} from './components/demo-app/demo-app'

import {provideAppStore, provideReducer} from './services/app-store'
import {counter} from './reducers/counter'

bootstrap(DemoApp, [
    provideReducer('counter', counter),
    provideAppStore()
])
