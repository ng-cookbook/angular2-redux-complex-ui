
import _ from 'lodash'
import {Component} from 'angular2/core'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'

@Component({
    selector: 'image-detail-list',
    template: `
        <p>Image Details</p>
        <ul>
            <li *ngFor="#img of imageList">
                {{img.name}}
            </li>
        </ul>
    `
})
@AppStoreSubscriber()
export class ImageDetailList implements IAppStoreSubscriber {

    public imageList: any[] = [];

    public onInitAppStoreSubscription(source: any): void {
        return source
            .subscribe((state: any) => {
                this.imageList = _.map(state.imageData.list, (v, k) => {
                    return v
                })
            })
    }
}
