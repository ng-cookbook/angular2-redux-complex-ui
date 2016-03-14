
import _ from 'lodash'
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {tagCompareValue, isTagIncludedInList} from '../../utils/tag-utils'

@Component({
    selector: 'image-group-list',
    directives: [],
    template: `
        <div class="row expanded">
            <div class="small-12 columns" *ngFor="#group of imageGroups">
                <h2>{{group.name}}</h2>
                <div>
                    <span *ngFor="#img of group.included">
                        {{img.name}}
                    </span>
                </div>
            </div>
        </div>
    `
})
@AppStoreSubscriber()
export class ImageGroupList implements IAppStoreSubscriber {

    public imageGroups: any[] = [];

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
                                name: img.name
                            }))
                            .value()
                    }))
                    .value()
            })
    }
}
