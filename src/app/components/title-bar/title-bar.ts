
import {Component, Input} from '@angular/core'

@Component({
    selector: 'title-bar',
    templateUrl: 'app/components/title-bar/title-bar.html'
})
export class TitleBar {
    @Input() public isLoading: boolean
    public loadingMessage: string = 'Loading images ...'
}
