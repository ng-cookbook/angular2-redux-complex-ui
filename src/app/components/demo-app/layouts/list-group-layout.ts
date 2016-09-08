
import {Component} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription'
import {IAppStoreSubscriber, AppStoreSubscriber} from '../../../decorators/app-store-subscriber';
import {waitForImageListToLoad} from '../../../utils/app-utils';

@Component({
    selector: 'list-group-layout',
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
