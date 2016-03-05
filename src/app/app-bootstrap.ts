
import {bootstrap} from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http'
import {DemoApp} from './components/demo-app/demo-app'

import {provideAppStore, provideReducer} from './services/app-store'
import {imageData} from './reducers/image-data'

bootstrap(DemoApp, [
    HTTP_PROVIDERS,
    provideReducer('imageData', imageData),
    provideAppStore()
])
