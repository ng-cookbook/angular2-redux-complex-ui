
import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {ImageDetailRow} from './image-detail-row'
import {AppStore} from '../../services/app-store'
import {SortableColumnHeader} from './sortable-column-header'
import {ImageSortBy} from '../../actions/images-actions'

@Component({
    selector: 'image-detail-table',
    directives: [ImageDetailRow, SortableColumnHeader],
    template: `
        <table class="hover">
            <thead>
            <tr>
                <th class="sortable-column-header" [sortIndicator]="nameSortIndicator" (toggleSort)="sortByName()">Name</th>
                <th class="sortable-column-header" [sortIndicator]="sizeSortIndicator" (toggleSort)="sortBySize()">Size (bytes)</th>
                <th class="sortable-column-header" [sortIndicator]="dateSortIndicator" (toggleSort)="sortByDate()">Taken</th>
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
    @Input() public sortBy: ImageSortBy;
    @Input() public isAscending: boolean;
    @Output() public toggleNameSort: EventEmitter<any> = new EventEmitter();
    @Output() public toggleSizeSort: EventEmitter<any> = new EventEmitter();
    @Output() public toggleDateSort: EventEmitter<any> = new EventEmitter();

    constructor(private appStore: AppStore) {
    }

    public get nameSortIndicator() {
        return this.sortBy === ImageSortBy.name ? this.isAscending ? 1 : -1 : 0;
    }

    public get sizeSortIndicator() {
        return this.sortBy === ImageSortBy.size ? this.isAscending ? 1 : -1 : 0;
    }

    public get dateSortIndicator() {
        return this.sortBy === ImageSortBy.date ? this.isAscending ? 1 : -1 : 0;
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
