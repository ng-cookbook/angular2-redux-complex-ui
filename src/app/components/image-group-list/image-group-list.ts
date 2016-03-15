
import _ from 'lodash'
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {tagCompareValue, isTagIncludedInList} from '../../utils/tag-utils'

@Component({
    selector: 'image-group-list',
    directives: [],
    templateUrl: 'app/components/image-group-list/image-group-list.html',
    styleUrls: ['app/components/image-group-list/image-group-list.css']
})
@AppStoreSubscriber()
export class ImageGroupList implements IAppStoreSubscriber {

    public imageGroups: any[];

    constructor(private appStore: AppStore) {
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .map((state: any) => state.imageData)
            .subscribe((imageData: any) => {
                this.imageGroups = _(imageData.displayedItems)
                    .map((id: string) => imageData.dataSet[id].tags || [])
                    .flatten()
                    .map((tag: string) => tagCompareValue(tag))
                    .uniq()
                    .orderBy(tag => tag)
                    .map((tag: string) => ({
                        name: tag,
                        included: _(imageData.displayedItems)
                            .map((id: string) => imageData.dataSet[id])
                            .filter((img: any) => isTagIncludedInList(tag, img.tags))
                            .map((img: any) => ({
                                title: img.title,
                                url: ['api', 'images', img.id, 'thumb'].join('/')
                            }))
                            .value()
                    }))
                    .value()
            })
    }
}
