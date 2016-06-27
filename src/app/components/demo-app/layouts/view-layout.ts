
import {Component, Input, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {TitleBar} from '../../title-bar/title-bar'
import {ImageView} from '../../image-view/image-view'
import {AppStore} from '../../../services/app-store'
import {selectCurrentImage} from '../../../actions/image-list-actions'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../../decorators/app-store-subscriber'

interface IViewLayoutRouteParams {
    id: string;
}

@Component({
    selector: 'view-layout',
    directives: [TitleBar, ImageView],
    templateUrl: 'app/components/demo-app/layouts/view-layout.html',
    styleUrls: ['app/components/demo-app/layouts/view-layout.css']
})
@AppStoreSubscriber()
export class ViewLayout implements IAppStoreSubscriber, OnInit {

    @Input() public isLoading: boolean = true

    private imageId: string

    constructor(
        private route: ActivatedRoute,
        private appStore: AppStore) {
    }

    public ngOnInit() {
        this.route.params
            .subscribe((params: IViewLayoutRouteParams) => {
                this.imageId = params.id;
            });
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .filter((state: any) => !state.imageData.isLoading)
            .take(1)
            .subscribe((state: any) => this.appStore.dispatch(selectCurrentImage(this.imageId)))
    }
}
