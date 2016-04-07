
import {Component, Input} from 'angular2/core'
import {TitleBar} from '../../title-bar/title-bar'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'

@Component({
    selector: 'list-layout',
    directives: [TitleBar, ImageDetailList],
    templateUrl: 'app/components/demo-app/layouts/list-layout.html',
    styleUrls: ['app/components/demo-app/layouts/list-layout.css']
})
export class ListLayout {
    @Input() public isLoading: boolean = true
}
