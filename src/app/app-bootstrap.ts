
import {bootstrap} from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS} from '@angular/http'
import {ROUTER_DIRECTIVES} from '@angular/router'
import {disableDeprecatedForms, provideForms} from '@angular/forms'
import {DemoApp} from './components/demo-app/demo-app'

import {provideAppStore, provideReducer} from './services/app-store'
import {imageData} from './reducers/image-list'

bootstrap(DemoApp, [
    HTTP_PROVIDERS,
    ROUTER_DIRECTIVES,
    provideReducer('imageData', imageData),
    provideAppStore(),
    disableDeprecatedForms(),
    provideForms()
])
