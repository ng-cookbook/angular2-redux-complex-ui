
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {LogViewer} from '../log-viewer/log-viewer'

@Component({
    selector: 'demo-app',
    directives: [LogViewer],
    template: `
        <p>Demo App</p>
        <log-viewer></log-viewer>
    `
})
export class DemoApp {

    constructor(appStore: AppStore) {
    }
}
