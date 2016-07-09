
import {Component} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {TitleBar} from '../../title-bar/title-bar'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../../decorators/app-store-subscriber';
import {waitForImageListToLoad} from '../../../utils/app-utils';

@Component({
    selector: 'list-layout',
    directives: [TitleBar, ImageDetailList],
    templateUrl: 'app/components/demo-app/layouts/list-layout.html',
    styleUrls: ['app/components/demo-app/layouts/list-layout.css']
})
@AppStoreSubscriber()
export class ListLayout implements IAppStoreSubscriber {

    public isLoading: boolean = true;

    public onInitAppStoreSubscription(source: Observable<any>): Subscription {
        return waitForImageListToLoad(source)
            .subscribe(() => this.isLoading = false)
    }
}
