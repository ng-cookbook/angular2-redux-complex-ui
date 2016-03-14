
import {Component, Input} from 'angular2/core'
import {LoadingIndicator} from '../loading-indicator/loading-indicator'
import {resetZurbFoundation} from '../../services/zurb-foundation-services'
import {AppStore} from '../../services/app-store'
import {changeLayout, LayoutModes} from '../../actions/images-actions'

@Component({
    selector: 'title-bar',
    directives: [LoadingIndicator],
    templateUrl: 'app/components/demo-app/title-bar.html'
})
export class TitleBar {

    @Input() public isLoading: boolean = true
    public loadingMessage: string = 'Loading Images ...'

    constructor(private appStore: AppStore) {
    }

    public ngAfterViewInit() {
        resetZurbFoundation(); // To initialize menu functionality
    }

    public selectListLayout() {
        this.appStore.dispatch(changeLayout(LayoutModes.list))
    }

    public selectListGroupLayout() {
        this.appStore.dispatch(changeLayout(LayoutModes.listGroup))
    }

}
