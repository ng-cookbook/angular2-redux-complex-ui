
import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {ImageDetailRow} from './image-detail-row'
import {AppStore} from '../../services/app-store'
import {SortableColumnHeader} from './sortable-column-header'

@Component({
    selector: 'image-detail-table',
    directives: [ImageDetailRow, SortableColumnHeader],
    template: `
        <table class="hover">
            <thead>
            <tr>
                <th class="sortable-column-header" (toggleSort)="sortByName()">Name</th>
                <th class="sortable-column-header" (toggleSort)="sortBySize()">Size (bytes)</th>
                <th class="sortable-column-header" (toggleSort)="sortByDate()">Taken</th>
                <th>Dimensions</th>
                <th>Orientation</th>
                <th>Tags</th>
            </tr>
            </thead>
            <tbody>
            <tr class="image-detail-row" *ngFor="#rowData of tableData" [rowData]="rowData"></tr>
            </tbody>
        </table>
    `
})
export class ImageDetailTable {
    @Input() public tableData: any;
    @Output() public toggleNameSort: EventEmitter<any> = new EventEmitter();
    @Output() public toggleSizeSort: EventEmitter<any> = new EventEmitter();
    @Output() public toggleDateSort: EventEmitter<any> = new EventEmitter();

    constructor(private appStore: AppStore) {
    }

    public sortByName() {
        this.toggleNameSort.emit(null);
    }

    public sortBySize() {
        this.toggleSizeSort.emit(null);
    }

    public sortByDate() {
        this.toggleDateSort.emit(null);
    }
}
