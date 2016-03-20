
import {Component} from 'angular2/core'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'

@Component({
    selector: 'image-view',
    directives: [],
    templateUrl: 'app/components/image-view/image-view.html',
    styleUrls: ['app/components/image-view/image-view.css']
})
@AppStoreSubscriber()
export class ImageView implements IAppStoreSubscriber {

    public image: any

    public onInitAppStoreSubscription(source: any): void {
        return source
            .filter((state: any) => state.imageData.currentImageId)
            .map((state: any) => ({
                details: state.imageData.dataSet[state.imageData.currentImageId],
                url: ['/api', 'images', state.imageData.currentImageId, 'image'].join('/')
            }))
            .subscribe((image: any) => this.image = image)
    }
}
