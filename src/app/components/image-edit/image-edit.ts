
import {Component} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {changeImageTitle, updateImageTags} from '../../actions/image-list-actions'
import {getUniqueTagsList} from '../../utils/tag-utils'

@Component({
    selector: 'image-edit',
    templateUrl: 'app/components/image-edit/image-edit.html',
    styleUrls: ['app/components/image-edit/image-edit.css']
})
@AppStoreSubscriber()
export class ImageEdit implements IAppStoreSubscriber {

    public image: any
    public tagsList: string[]

    constructor(private appStore: AppStore) {
    }

    public onInitAppStoreSubscription(source: Observable<any>): Subscription {
        return source
            .filter((state: any) => state.imageData.currentImageId)
            .map((state: any) => ({
                image: {
                    details: state.imageData.dataSet[state.imageData.currentImageId],
                    url: ['/api', 'images', state.imageData.currentImageId, 'image'].join('/'),
                    title: state.imageData.dataSet[state.imageData.currentImageId].title
                },
                tagsList: getUniqueTagsList(state.imageData.dataSet)
            }))
            .subscribe((data: any) => {
                this.image = data.image
                this.tagsList = data.tagsList
            })
    }

    public updateTitle(newTitle: string) {
        this.appStore.dispatch(changeImageTitle(this.image.details.id, newTitle))
    }

    public onTagsChanged(eventData: any) {
        this.appStore.dispatch(updateImageTags(this.image.details.id, eventData.tags))
    }
}
