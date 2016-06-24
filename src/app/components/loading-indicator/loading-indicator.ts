
import {Component, Input} from '@angular/core'

@Component({
    selector: 'loading-indicator',
    templateUrl: 'app/components/loading-indicator/loading-indicator.html',
    styleUrls: ['app/components/loading-indicator/loading-indicator.css']
})
export class LoadingIndicator {
    @Input() public loadingMessage: string;
}
