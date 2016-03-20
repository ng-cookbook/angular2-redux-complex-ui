
import {Component, Input} from 'angular2/core'
import {RouteParams} from 'angular2/router'
import {TitleBar} from '../title-bar'
import {ImageView} from '../../image-view/image-view'
import {AppStore} from '../../../services/app-store'
import {selectCurrentImage} from '../../../actions/image-list-actions'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../../decorators/app-store-subscriber'

@Component({
    selector: 'view-layout',
    directives: [TitleBar, ImageView],
    templateUrl: 'app/components/demo-app/layouts/view-layout.html',
    styleUrls: ['app/components/demo-app/layouts/view-layout.css']
})
@AppStoreSubscriber()
export class ViewLayout implements IAppStoreSubscriber {

    @Input() public isLoading: boolean = true

    private imageId: string;

    constructor(params: RouteParams, private appStore: AppStore) {
        this.imageId = params.get('id')
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .filter((state: any) => !state.imageData.isLoading)
            .take(1)
            .subscribe((state: any) => this.appStore.dispatch(selectCurrentImage(this.imageId)))
    }
}
