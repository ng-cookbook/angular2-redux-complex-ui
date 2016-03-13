
import {Component, Input} from 'angular2/core'
import {TitleBar} from '../title-bar'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'

@Component({
    selector: 'detail-only-layout',
    directives: [TitleBar, ImageDetailList],
    template: `
        <div class="root-layout">
            <div>
                <title-bar [isLoading]="isLoading"></title-bar>
            </div>
            <div>
                <image-detail-list></image-detail-list>
            </div>
        </div>
    `,
    styles: [`

.root-layout {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
}

.root-layout > div:nth-of-type(1) {
    flex: 0 0 auto;
}

.root-layout > div:nth-of-type(2) {
    flex: 1 1 auto;
    position: relative;
    overflow: auto;
}

`
    ]
})
export class DetailOnlyLayout {
    @Input() public isLoading: boolean = true
}
