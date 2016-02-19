
import {bootstrap} from 'angular2/platform/browser'
import {DemoApp} from './components/demo-app/demo-app'
import {AppStore} from './services/app-store'

import './services/app-store'

bootstrap(DemoApp, [
    AppStore
])
