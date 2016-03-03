
import {Component, Input} from 'angular2/core'

@Component({
    selector: 'loading-indicator',
    templateUrl: 'app/components/loading-indicator/loading-indicator.html',
    styleUrls: ['app/components/loading-indicator/loading-indicator.css']
})
export class LoadingIndicator {
    @Input() public loadingMessage: string;
    @Input() public isLoading: boolean;
}
