
import {Component} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription'
import {Http} from '@angular/http'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {imageDataRequest} from '../../actions/image-list-actions'

@Component({
    selector: 'demo-app',
    template: `<router-outlet></router-outlet>`
})
@AppStoreSubscriber()
export class ImagesSection implements IAppStoreSubscriber {

    public state = {}

    constructor(
        private appStore: AppStore,
        private http: Http) {
    }

    public onInitAppStoreSubscription(source: Observable<any>): Subscription {
        return source
            .map((state: any) => ({
                isLoading: state.imageData.isLoading
            }))
            .subscribe((componentState: any) => {
                this.state = componentState
            })
    }

    public ngOnInit() {
        // simulate a long load time
        setTimeout(() => this.appStore.dispatch(imageDataRequest(this.http)), 2000)
    }
}
