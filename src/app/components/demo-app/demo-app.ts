
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {LogViewer} from '../log-viewer/log-viewer'

@Component({
    selector: 'demo-app',
    directives: [LogViewer],
    template: `
        <div class="row">
            <div class="small-12 columns">
                <h1>Demo App</h1>
            </div>
            <div class="small-12 columns">
                <p>{{progressText}}</p>
            </div>
        </div>
        <div class="row">
            <div class="small-4 columns">
                <log-viewer *ngIf="!isFinished"></log-viewer>
            </div>
            <div class="small-4 columns">
                <log-viewer *ngIf="!isFinished"></log-viewer>
            </div>
            <div class="small-4 columns">
                <log-viewer *ngIf="!isFinished"></log-viewer>
            </div>
        </div>
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
