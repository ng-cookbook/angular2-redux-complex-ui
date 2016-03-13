
import {Component, Input} from 'angular2/core'
import {DetailOnlyLayout} from './layouts/detail-only-layout'

@Component({
    selector: 'app-layouts',
    directives: [DetailOnlyLayout],
    template: `
        <div [ngSwitch]="layoutMode">
            <div *ngSwitchWhen="1">
                <detail-only-layout [isLoading]="isLoading"></detail-only-layout>
            </div>
            <div *ngSwitchWhen="2">
                Layout Two
            </div>
        </div>
    `
})
export class AppLayouts {

    @Input() public isLoading: boolean = true
    @Input() public layoutMode: number = 1
}
