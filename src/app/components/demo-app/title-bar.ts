
import {Component, Input} from 'angular2/core'
import {LoadingIndicator} from '../loading-indicator/loading-indicator'
import {resetZurbFoundation} from '../../services/zurb-foundation-services'

@Component({
    selector: 'title-bar',
    directives: [LoadingIndicator],
    templateUrl: 'app/components/demo-app/title-bar.html'
})
export class TitleBar {

    @Input() public isLoading: boolean = true
    public loadingMessage: string = 'Loading Images ...'

    ngAfterViewInit() {
        // For menu functionality
        resetZurbFoundation();
    }

    selectDetailOnlyLayout() {
        console.log("Select detail only layout ...")
    }

    selectDetailAndGroupsLayout() {
        console.log("Select detail and groups layout ...")
    }

}
