
import {Component} from 'angular2/core'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'

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
export class LogViewer implements IAppStoreSubscriber {

    public logMessages: string[] = [
        'Initialized'
    ]

    public onInitAppStoreSubscription(source: any): void {
        return source
            .subscribe((state) => {
                this.logMessages.push(state)
            })
    }
}
