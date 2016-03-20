
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
            .do((state: any) => console.log('state', state))
            .filter((state: any) => state.imageData.currentImageId)
            .map((state: any) => ({
                selectedImage: state.imageData.dataSet[state.imageData.currentImageId],
                imageUrl: ['/api', 'images', state.imageData.currentImageId, 'image'].join('/')
            }))
            .subscribe((image: any) => this.image = image)
    }
}
