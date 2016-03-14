
import {Component, Input} from 'angular2/core'
import {ListLayout} from './list-layout'
import {ListGroupLayout} from './list-group-layout'

@Component({
    selector: 'app-layouts',
    directives: [ListLayout, ListGroupLayout],
    templateUrl: 'app/components/demo-app/layouts/app-layouts.html'
})
export class AppLayouts {

    @Input() public isLoading: boolean = true
    @Input() public layoutMode: number = 1
}
