
import {Component, Input} from 'angular2/core'
import {TitleBar} from '../title-bar'
import {ImageDetailList} from '../../image-detail-list/image-detail-list'

@Component({
    selector: 'list-group-layout',
    directives: [TitleBar, ImageDetailList],
    templateUrl: 'app/components/demo-app/layouts/list-group-layout.html',
    styleUrls: ['app/components/demo-app/layouts/list-group-layout.css']
})
export class ListGroupLayout {
    @Input() public isLoading: boolean = true
}
