
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'

@Component({
    selector: 'log-viewer',
    template: `
        <h2>Log Viewer</h2>
        <div>
            <div *ngFor="#msg of logMessages">{{msg}}</div>
        </div>
    `
})
export class LogViewer {

    public logMessages: string[]

    constructor(appStore: AppStore) {

        this.logMessages = [
            'Initialized'
        ]

        appStore
            .source
            .subscribe((state) => {
                this.logMessages.push(state)
            })
    }

    public ngOnDestroy() {
        console.log('Destroyed!!');
    }
}
