
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {excludeImageTags} from '../../actions/image-list-actions'
import {isMatchingTag, getSelectedTagsList, getExcludedTagsFromSelectedTagsList} from '../../utils/tag-utils'

@Component({
    selector: '[image-tag-selector]',
    templateUrl: 'app/components/image-detail-list/image-tag-selector.html',
    styleUrls: ['app/components/image-detail-list/image-tag-selector.css']
})
@AppStoreSubscriber()
export class ImageTagSelector implements IAppStoreSubscriber {

    public imageTags: any[] = [];

    constructor(private appStore: AppStore) {
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .map((state: any) => state.imageData)
            .subscribe((imageData: any) => {
                this.imageTags = getSelectedTagsList(imageData.dataSet, imageData.excludedTags)
            })
    }

    public selectAll(): void {
        this.imageTags = this.imageTags.map(v => ({ tag: v.tag, isSelected: true }))
        this.onSelectionChanged()
    }

    public selectNone(): void {
        this.imageTags = this.imageTags.map(v => ({ tag: v.tag, isSelected: false }))
        this.onSelectionChanged()
    }

    public toggleSelectedTag(tag, isSelected) {
        this.imageTags = this.imageTags.map(v => isMatchingTag(v.tag, tag) ? {tag, isSelected} : v)
        this.onSelectionChanged()
    }

    private onSelectionChanged(): void {
        let excludedTags = getExcludedTagsFromSelectedTagsList(this.imageTags);
        this.appStore.dispatch(excludeImageTags(excludedTags))
    }
}
