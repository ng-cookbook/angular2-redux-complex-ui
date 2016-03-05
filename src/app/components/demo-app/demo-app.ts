
import {Component} from 'angular2/core'
import {Http} from 'angular2/http'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {imageDataRequest} from '../../actions/images-actions'
import {LoadingIndicator} from '../loading-indicator/loading-indicator'
import {ImageDetailList} from '../image-detail-list/image-detail-list'

@Component({
    selector: 'demo-app',
    directives: [LoadingIndicator, ImageDetailList],
    template: `
        <div class="row">
            <div class="small-12 columns">
                <h1>
                    Demo App
                    <loading-indicator [isLoading]="isLoading" [loadingMessage]="loadingMessage"></loading-indicator>
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="small-12 columns">
                <image-detail-list></image-detail-list>
            </div>
        </div>
    `
})
@AppStoreSubscriber()
export class DemoApp implements IAppStoreSubscriber {

    public isLoading: boolean = true
    public loadingMessage: string = 'Loading Images ...'

    constructor(
        private appStore: AppStore,
        private http: Http) {
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .subscribe((state: any) => {
                this.isLoading = state.imageData.isLoading
            })
    }

    public ngOnInit() {
        this.appStore.dispatch(imageDataRequest(this.http))
    }
}
