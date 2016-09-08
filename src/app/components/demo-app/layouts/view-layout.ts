
import {Component} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription'
import {ActivatedRoute} from '@angular/router'
import {AppStore} from '../../../services/app-store'
import {selectCurrentImage} from '../../../actions/image-list-actions'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../../decorators/app-store-subscriber'
import {waitForImageListToLoad, watchForImageIdChanges} from '../../../utils/app-utils';

@Component({
    selector: 'view-layout',
    templateUrl: 'app/components/demo-app/layouts/view-layout.html',
    styleUrls: ['app/components/demo-app/layouts/view-layout.css']
})
@AppStoreSubscriber()
export class ViewLayout implements IAppStoreSubscriber {

    public isLoading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private appStore: AppStore) {
    }

    public onInitAppStoreSubscription(source: Observable<any>): Subscription {
        return waitForImageListToLoad(source)
            .do(() => this.isLoading = false)
            .switchMapTo(watchForImageIdChanges(this.route.params))
            .subscribe((imageId: string) => {
                this.appStore.dispatch(selectCurrentImage(imageId))
            })
    }
}
