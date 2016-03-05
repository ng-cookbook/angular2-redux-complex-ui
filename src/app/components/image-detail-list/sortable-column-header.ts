
import {Component, Output, EventEmitter} from 'angular2/core'

@Component({
    selector: '.sortable-column-header',
    template: `
        <div (click)="onHeaderClicked($event)" style="cursor: pointer;">
            <ng-content></ng-content>
        </div>
    `
})
export class SortableColumnHeader {
    @Output() public toggleSort: EventEmitter<any> = new EventEmitter();

    public onHeaderClicked(event) {
        event.preventDefault();
        this.toggleSort.emit(null);
    }
}
