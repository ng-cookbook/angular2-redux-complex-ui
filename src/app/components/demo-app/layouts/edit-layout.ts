
import {Component} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {ActivatedRoute} from '@angular/router'
import {TitleBar} from '../../title-bar/title-bar'
import {ImageGroupList} from '../../image-group-list/image-group-list'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'
import {ImageEdit} from '../../image-edit/image-edit'
import {AppStore} from '../../../services/app-store'
import {selectCurrentImage} from '../../../actions/image-list-actions'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../../decorators/app-store-subscriber'
import {waitForImageListToLoad, watchForImageIdChanges} from '../../../utils/app-utils';

@Component({
    selector: 'edit-layout',
    directives: [TitleBar, ImageDetailList, ImageGroupList, ImageEdit],
    templateUrl: 'app/components/demo-app/layouts/edit-layout.html',
    styleUrls: ['app/components/demo-app/layouts/edit-layout.css']
})
@AppStoreSubscriber()
export class EditLayout implements IAppStoreSubscriber {

    public isLoading: boolean = true

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
