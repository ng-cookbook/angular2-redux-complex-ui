
import {Component} from 'angular2/core'
import {Http} from 'angular2/http'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {imageDataRequest} from '../../actions/images-actions'
import {AppLayouts} from './app-layouts'

@Component({
    selector: 'demo-app',
    directives: [AppLayouts],
    template: `
        <app-layouts
            [isLoading]="state.isLoading"
            [layoutMode]="state.layoutMode"></app-layouts>
    `
})
@AppStoreSubscriber()
export class DemoApp implements IAppStoreSubscriber {

    public state = {};

    constructor(
        private appStore: AppStore,
        private http: Http) {
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .map((state: any) => ({
                isLoading: state.imageData.isLoading,
                layoutMode: state.imageData.layoutMode
            }))
            .subscribe((componentState: any) => {
                this.state = componentState
            })
    }

    public ngOnInit() {
        setTimeout(() => this.appStore.dispatch(imageDataRequest(this.http)), 2000)
    }
}
