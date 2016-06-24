
import {bootstrap} from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS} from '@angular/http'
import {ROUTER_PROVIDERS} from '@angular/router-deprecated'
import {disableDeprecatedForms, provideForms} from '@angular/forms'
import {DemoApp} from './components/demo-app/demo-app'

import {provideAppStore, provideReducer} from './services/app-store'
import {imageData} from './reducers/image-list'

bootstrap(DemoApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provideReducer('imageData', imageData),
    provideAppStore(),
    disableDeprecatedForms(),
    provideForms()
])
