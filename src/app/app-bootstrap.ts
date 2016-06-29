
import {bootstrap} from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS} from '@angular/http'
import {APP_ROUTER_PROVIDERS} from './app-routes'
import {disableDeprecatedForms, provideForms} from '@angular/forms'
import {DemoApp} from './demo-app'

import {provideAppStore, provideReducer} from './services/app-store'
import {imageData} from './reducers/image-list'

bootstrap(DemoApp, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    provideReducer('imageData', imageData),
    provideAppStore(),
    disableDeprecatedForms(),
    provideForms()
])
