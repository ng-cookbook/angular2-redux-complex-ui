
import {Component, Input, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {TitleBar} from '../../title-bar/title-bar'
import {ImageGroupList} from '../../image-group-list/image-group-list'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'
import {ImageEdit} from '../../image-edit/image-edit'
import {AppStore} from '../../../services/app-store'
import {selectCurrentImage} from '../../../actions/image-list-actions'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../../decorators/app-store-subscriber'

interface IEditLayoutRouteParams {
    id: string;
}

@Component({
    selector: 'edit-layout',
    directives: [TitleBar, ImageDetailList, ImageGroupList, ImageEdit],
    templateUrl: 'app/components/demo-app/layouts/edit-layout.html',
    styleUrls: ['app/components/demo-app/layouts/edit-layout.css']
})
@AppStoreSubscriber()
export class EditLayout implements IAppStoreSubscriber, OnInit {

    @Input() public isLoading: boolean = true

    private imageId: string

    constructor(
        private route: ActivatedRoute,
        private appStore: AppStore) {
    }

    public ngOnInit() {
        this.route.params
            .subscribe((params: IEditLayoutRouteParams) => {
                this.imageId = params.id;
            })
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .filter((state: any) => !state.imageData.isLoading)
            .take(1)
            .subscribe((state: any) => this.appStore.dispatch(selectCurrentImage(this.imageId)))
    }
}
