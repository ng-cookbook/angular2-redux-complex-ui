
import {Component, Input} from 'angular2/core'
import {LoadingIndicator} from '../loading-indicator/loading-indicator'

@Component({
    selector: 'title-bar',
    directives: [LoadingIndicator],
    templateUrl: 'app/components/demo-app/title-bar.html'
})
export class TitleBar {

    @Input() public isLoading: boolean = true
    public loadingMessage: string = 'Loading Images ...'
}
