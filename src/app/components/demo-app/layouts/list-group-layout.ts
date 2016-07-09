
import {Component} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {TitleBar} from '../../title-bar/title-bar'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'
import {ImageGroupList} from '../../image-group-list/image-group-list'
import {IAppStoreSubscriber, AppStoreSubscriber} from '../../../decorators/app-store-subscriber';
import {waitForImageListToLoad} from '../../../utils/app-utils';

@Component({
    selector: 'list-group-layout',
    directives: [TitleBar, ImageDetailList, ImageGroupList],
    templateUrl: 'app/components/demo-app/layouts/list-group-layout.html',
    styleUrls: ['app/components/demo-app/layouts/list-group-layout.css']
})
@AppStoreSubscriber()
export class ListGroupLayout implements IAppStoreSubscriber {

    public isLoading: boolean = true;

    public onInitAppStoreSubscription(source: Observable<any>): Subscription {
        return waitForImageListToLoad(source)
            .subscribe(() => this.isLoading = false)
    }
}
