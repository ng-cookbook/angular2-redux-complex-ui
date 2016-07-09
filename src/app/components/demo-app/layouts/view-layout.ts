
import {Component} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {ActivatedRoute} from '@angular/router'
import {TitleBar} from '../../title-bar/title-bar'
import {ImageView} from '../../image-view/image-view'
import {AppStore} from '../../../services/app-store'
import {selectCurrentImage} from '../../../actions/image-list-actions'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../../decorators/app-store-subscriber'
import {waitForImageListToLoad, watchForImageIdChanges} from '../../../utils/app-utils';

@Component({
    selector: 'view-layout',
    directives: [TitleBar, ImageView],
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
