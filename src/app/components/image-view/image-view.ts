
import {Component} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {ROUTER_DIRECTIVES} from '@angular/router'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'

@Component({
    selector: 'image-view',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/image-view/image-view.html',
    styleUrls: ['app/components/image-view/image-view.css']
})
@AppStoreSubscriber()
export class ImageView implements IAppStoreSubscriber {

    public image: any

    public onInitAppStoreSubscription(source: Observable<any>): Subscription {
        return source
            .filter((state: any) => state.imageData.currentImageId)
            .map((state: any) => ({
                details: state.imageData.dataSet[state.imageData.currentImageId],
                url: ['/api', 'images', state.imageData.currentImageId, 'image'].join('/')
            }))
            .subscribe((image: any) => this.image = image)
    }
}
