
import {Component} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../../decorators/app-store-subscriber';
import {waitForImageListToLoad} from '../../../utils/app-utils';

@Component({
    selector: 'list-layout',
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
