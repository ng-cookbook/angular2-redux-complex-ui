
import {Component, Input} from 'angular2/core'
import {TitleBar} from '../title-bar'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'

@Component({
    selector: 'detail-only-layout',
    directives: [TitleBar, ImageDetailList],
    template: `
        <div>
            <div>
                <title-bar [isLoading]="isLoading"></title-bar>
            </div>
            <div>
                <image-detail-list></image-detail-list>
            </div>
        </div>
    `
})
export class DetailOnlyLayout {
    @Input() public isLoading: boolean = true
}
