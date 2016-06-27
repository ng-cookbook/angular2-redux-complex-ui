
import {Component} from '@angular/core'
import {provideRouter, RouterConfig, ROUTER_DIRECTIVES} from '@angular/router'
import {ImagesSection} from './images-section'

const routes: RouterConfig = [
    { path: '/images', component: ImagesSection }
];

@Component({
    selector: 'demo-app',
    directives: [ROUTER_DIRECTIVES],
    template: `<router-outlet></router-outlet>`,
    providers: [provideRouter(routes)]
})
export class DemoApp {
}
