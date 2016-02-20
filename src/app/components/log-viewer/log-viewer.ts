
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber} from '../../decorators/app-store-subscriber'

@Component({
    selector: 'log-viewer',
    template: `
        <h2>Log Viewer</h2>
        <div>
            <div *ngFor="#msg of logMessages">{{msg}}</div>
        </div>
    `
})
@AppStoreSubscriber()
export class LogViewer {

    public logMessages: string[]

    private stateSubscription;

    constructor(appStore: AppStore) {

        this.logMessages = [
            'Initialized'
        ]

        this.stateSubscription = appStore
            .source
            .subscribe((state) => {
                this.logMessages.push(state)
            })
    }

    public ngOnDestroy() {
        console.log('LogViewer Destroyed!!');
        this.stateSubscription.unsubscribe()
    }
}
