
import {bootstrap} from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {DemoApp} from './components/demo-app/demo-app'

import {provideAppStore, provideReducer} from './services/app-store'
import {imageData} from './reducers/image-list'

bootstrap(DemoApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provideReducer('imageData', imageData),
    provideAppStore()
])
