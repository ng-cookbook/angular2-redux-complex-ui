
import {Component} from 'angular2/core'
import {RouteParams} from 'angular2/router'
import {TitleBar} from '../title-bar'
import {AppStore} from '../../../services/app-store'
import {selectCurrentImage} from '../../../actions/image-list-actions'

@Component({
    selector: 'view-layout',
    directives: [TitleBar],
    templateUrl: 'app/components/demo-app/layouts/view-layout.html',
    styleUrls: ['app/components/demo-app/layouts/view-layout.css']
})
export class ViewLayout {

    public imageUrl: string
    public imageInfo: any = {}

    constructor(
        params: RouteParams,
        appStore: AppStore) {

        let imageId = params.get('id')
        this.imageUrl = ['/api', 'images', imageId, 'image'].join('/')

        appStore.dispatch(selectCurrentImage(imageId))
        let state = appStore.currentState
        if (state.imageData.currentImageId) {
            this.imageInfo = state.imageData.dataSet[state.imageData.currentImageId]
        }
    }
}
