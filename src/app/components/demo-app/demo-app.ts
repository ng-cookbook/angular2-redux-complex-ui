
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'

@Component({
    selector: 'demo-app',
    template: '<p>Hello World!</p>'
})
export class DemoApp {

    constructor(appStore: AppStore) {
    }
}
