
import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
    selector: '.sortable-column-header',
    template: `
        <div (click)="onHeaderClicked($event)" style="cursor: pointer;">
            <span *ngIf="sortIndicator < 0">[DESC]</span>
            <span *ngIf="sortIndicator > 0">[ASC]</span>
            <ng-content></ng-content>
        </div>
    `
})
export class SortableColumnHeader {
    @Input() public sortIndicator: number;
    @Output() public toggleSort: EventEmitter<any> = new EventEmitter();

    public onHeaderClicked(event) {
        event.preventDefault();
        this.toggleSort.emit(null);
    }
}
