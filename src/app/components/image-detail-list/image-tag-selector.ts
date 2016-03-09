
import _ from 'lodash'
import {Component} from 'angular2/core'
import {AppStore} from '../../services/app-store'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'

@Component({
    selector: '[image-tag-selector]',
    template: `
        <div>
            <button class="small button" (click)="selectAll()">Select All</button>
            <button class="small button" (click)="selectNone()">Select None</button>
        </div>
        <div>
            <label *ngFor="#tag of imageTags">
                <input type="checkbox" [checked]="tag.isSelected">
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
                this.imageTags = _(state.imageData.list)
                    .map((v: any, k: any) => v.tags)
                    .flatten()
                    .uniq()
                    .sortBy(v => v)
                    .map(tag => ({ tag, isSelected: true }))
                    .value()
                console.log(this.imageTags);
            })
    }

    public selectAll(): void {
        this.imageTags = this.imageTags.map(tag => ({ tag: tag.tag, isSelected: true }));
    }

    public selectNone(): void {
        this.imageTags = this.imageTags.map(tag => ({ tag: tag.tag, isSelected: false }));
    }
}
