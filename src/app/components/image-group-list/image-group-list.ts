
import _ from 'lodash'
import {Component} from 'angular2/core'
import {RouterLink, RouteData} from 'angular2/router'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {isTagIncludedInList, getUniqueTagsList} from '../../utils/tag-utils'

@Component({
    selector: 'image-group-list',
    directives: [RouterLink],
    templateUrl: 'app/components/image-group-list/image-group-list.html',
    styleUrls: ['app/components/image-group-list/image-group-list.css']
})
@AppStoreSubscriber()
export class ImageGroupList implements IAppStoreSubscriber {

    public imageGroups: any[];

    private isEditRoute: boolean;

    constructor(
        private appStore: AppStore,
        private routeData: RouteData) {

        this.isEditRoute = routeData.get("isEditRoute")
    }

    public imageRouteFor(img) {
        return [
            '/Images',
            this.isEditRoute ? 'Edit' : 'View',
            { id: img.id }
        ];
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .map((state: any) => state.imageData)
            .subscribe((imageData: any) => {
                this.imageGroups = _(getUniqueTagsList(imageData.dataSet))
                    .filter((tag: string) => !isTagIncludedInList(tag, imageData.excludedTags))
                    .orderBy(tag => tag)
                    .map((tag: string) => ({
                        name: tag,
                        included: _(_.values(imageData.dataSet))
                            .filter((img: any) => isTagIncludedInList(tag, img.tags))
                            .map((img: any) => ({
                                id: img.id,
                                title: img.title,
                                url: ['api', 'images', img.id, 'thumb'].join('/')
                            }))
                            .value()
                    }))
                    .value()
            })
    }
}
