
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {LogViewer} from '../log-viewer/log-viewer'
import {counterActionCreator} from '../../actions/counterActions'

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
@AppStoreSubscriber()
export class DemoApp implements IAppStoreSubscriber {

    public isFinished = false

    constructor(appStore: AppStore) {
        setTimeout(() => appStore.dispatch(counterActionCreator()), 2000);
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .subscribe((state) => {
                this.isFinished = state.counter === 3
            })
    }

    get progressText() {
        return this.isFinished ? 'Finished!' : 'Working ...'
    }
}
