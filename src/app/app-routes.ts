
import {provideRouter, RouterConfig} from '@angular/router'
import {imagesRoutes} from './components/demo-app/images-routes'

const routes: RouterConfig = [
    { path: '', redirectTo: '/images/list', terminal: true },
    ...imagesRoutes
]

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
]
