
import {Component, Input} from 'angular2/core'
import {ListLayout} from './list-layout'

@Component({
    selector: 'app-layouts',
    directives: [ListLayout],
    templateUrl: 'app/components/demo-app/layouts/app-layouts.html'
})
export class AppLayouts {

    @Input() public isLoading: boolean = true
    @Input() public layoutMode: number = 1
}
