
import {Component, Input} from 'angular2/core'
import {TitleBar} from '../title-bar'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'

@Component({
    selector: 'detail-only-layout',
    directives: [TitleBar, ImageDetailList],
    templateUrl: 'app/components/demo-app/layouts/detail-only-layout.html',
    styleUrls: ['app/components/demo-app/layouts/detail-only-layout.css']
})
export class DetailOnlyLayout {
    @Input() public isLoading: boolean = true
}
