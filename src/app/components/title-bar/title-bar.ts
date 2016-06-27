
import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router'
import {LoadingIndicator} from '../loading-indicator/loading-indicator'
import {AppStoreSubscriber, IAppStoreSubscriber} from '../../decorators/app-store-subscriber'
import {InitializeDropdown} from '../../directives/semanti-ui-init'

@Component({
    selector: 'title-bar',
    directives: [LoadingIndicator, ROUTER_DIRECTIVES, InitializeDropdown],
    templateUrl: 'app/components/title-bar/title-bar.html'
})
@AppStoreSubscriber()
export class TitleBar implements IAppStoreSubscriber {

    public isLoading: boolean = true
    public loadingMessage: string = 'Loading Images ...'

    public onInitAppStoreSubscription(source: any): void {
        return source
            .map((state: any) => state.imageData.isLoading)
            .subscribe((isLoading: boolean) => {
                this.isLoading = isLoading
            })
    }

}
