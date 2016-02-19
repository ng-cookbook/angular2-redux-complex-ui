
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {LogViewer} from '../log-viewer/log-viewer'

@Component({
    selector: 'demo-app',
    directives: [LogViewer],
    template: `
        <p>Demo App</p>
        <p>{{progressText}}</p>
        <log-viewer *ngIf="!isFinished"></log-viewer>
    `
})
export class DemoApp {

    public isFinished = false

    constructor(appStore: AppStore) {
        appStore
            .source
            .subscribe((state) => {
                this.isFinished = state === 3
            })
    }

    get progressText() {
        return this.isFinished ? 'Finished!' : 'Working ...'
    }
}
