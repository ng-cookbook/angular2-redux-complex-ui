
import _ from 'lodash'
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {excludeImageTags} from '../../actions/images-actions'

@Component({
    selector: '[image-tag-selector]',
    template: `
        <div>
            <button class="small button" (click)="selectAll()">Select All</button>
            <button class="small button" (click)="selectNone()">Select None</button>
        </div>
        <div>
            <label *ngFor="#tag of imageTags">
                <input type="checkbox" [checked]="tag.isSelected" (change)="onSelectionChanged()">
                {{tag.tag}}
            </label>
        </div>
    `
})
@AppStoreSubscriber()
export class ImageTagSelector implements IAppStoreSubscriber {

    public imageTags: any[] = [];

    constructor(private appStore: AppStore) {
    }

    public onInitAppStoreSubscription(source: any): void {
        return source
            .subscribe((state: any) => {
                this.imageTags = _(_.values(state.imageData.dataSet))
                    .map((v: any, k: any) => v.tags)
                    .flatten()
                    .filter(v => !!v)
                    .uniq()
                    .sortBy((v: string) => tagCompareValue(v))
                    .map((tag: string) => ({
                        tag,
                        isSelected: !_.some(state.excludedTags, (exTag: string) => isMatchingTag(tag, exTag))
                    }))
                    .value()
                console.log(this.imageTags);
            })
    }

    public selectAll(): void {
        this.imageTags = this.imageTags.map(tag => ({ tag: tag.tag, isSelected: true }));
        this.onSelectionChanged()
    }

    public selectNone(): void {
        this.imageTags = this.imageTags.map(tag => ({ tag: tag.tag, isSelected: false }));
        this.onSelectionChanged()
    }

    public onSelectionChanged(): void {
        let excludedTags = _(this.imageTags)
            .filter((v: any) => !v.isSelected)
            .map((v: any) => v.tag)
            .value()
        this.appStore.dispatch(excludeImageTags(excludedTags))
    }
}

function isMatchingTag(tag1: string, tag2: string) {
    return tagCompareValue(tag1) === tagCompareValue(tag2);
}

function tagCompareValue(tag: string) {
    return (tag || '').toLocaleLowerCase();
}
