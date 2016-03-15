
import {Component, Input} from 'angular2/core'
import {RouterLink} from 'angular2/router'
import {LoadingIndicator} from '../loading-indicator/loading-indicator'
import {resetZurbFoundation} from '../../services/zurb-foundation-services'

@Component({
    selector: 'title-bar',
    directives: [LoadingIndicator, RouterLink],
    templateUrl: 'app/components/demo-app/title-bar.html'
})
export class TitleBar {

    @Input() public isLoading: boolean = true
    public loadingMessage: string = 'Loading Images ...'

    public ngAfterViewInit() {
        resetZurbFoundation(); // To initialize menu functionality
    }

}
