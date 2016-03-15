
import {Component} from 'angular2/core'
import {RouteConfig, RouterOutlet} from 'angular2/router'
import {ImagesSection} from './images-section'

@Component({
    selector: 'demo-app',
    directives: [RouterOutlet],
    template: `<router-outlet></router-outlet>`
})
@RouteConfig([
    {
        path: '/images/...',
        name: 'Images',
        component: ImagesSection,
        useAsDefault: true
    }
])
export class DemoApp {
}
