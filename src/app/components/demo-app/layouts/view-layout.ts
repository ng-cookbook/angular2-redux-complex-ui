
import {Component, Input} from 'angular2/core'
import {RouteParams} from 'angular2/router'
import {TitleBar} from '../title-bar'
import {ImageView} from '../../image-view/image-view'
import {AppStore} from '../../../services/app-store'
import {selectCurrentImage} from '../../../actions/image-list-actions'

@Component({
    selector: 'view-layout',
    directives: [TitleBar, ImageView],
    templateUrl: 'app/components/demo-app/layouts/view-layout.html',
    styleUrls: ['app/components/demo-app/layouts/view-layout.css']
})
export class ViewLayout {

    @Input() public isLoading: boolean = true

    constructor(params: RouteParams, appStore: AppStore) {
        let imageId = params.get('id')
        appStore.dispatch(selectCurrentImage(imageId))
    }
}
