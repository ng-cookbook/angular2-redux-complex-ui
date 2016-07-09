
import {Component, Input} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router'
import {LoadingIndicator} from '../loading-indicator/loading-indicator'
import {InitializeDropdown} from '../../directives/semanti-ui-init'

@Component({
    selector: 'title-bar',
    directives: [LoadingIndicator, InitializeDropdown, ROUTER_DIRECTIVES],
    templateUrl: 'app/components/title-bar/title-bar.html'
})
export class TitleBar {
    @Input() public isLoading: boolean
    public loadingMessage: string = 'Loading images ...'
}
