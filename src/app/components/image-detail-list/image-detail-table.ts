
import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {ImageDetailRow} from './image-detail-row'
import {AppStore} from '../../services/app-store'
import {SortableColumnHeader} from './sortable-column-header'
import {ImageTagSelector} from './image-tag-selector'
import {ImageSortBy} from '../../actions/image-list-actions'

@Component({
    selector: 'image-detail-table',
    directives: [
        ImageDetailRow,
        SortableColumnHeader,
        ImageTagSelector
    ],
    templateUrl: 'app/components/image-detail-list/image-detail-table.html'
})
export class ImageDetailTable {

    @Input() public tableData: any;
    @Input() public sortBy: ImageSortBy;
    @Input() public isAscending: boolean;
    @Output() public toggleTitleSort: EventEmitter<any> = new EventEmitter();
    @Output() public toggleSizeSort: EventEmitter<any> = new EventEmitter();
    @Output() public toggleDateSort: EventEmitter<any> = new EventEmitter();

    public showTagSelector: boolean = false;

    constructor(private appStore: AppStore) {
    }

    public get titleSortIndicator() {
        return this.sortBy === ImageSortBy.title ? this.isAscending ? 1 : -1 : 0;
    }

    public get sizeSortIndicator() {
        return this.sortBy === ImageSortBy.size ? this.isAscending ? 1 : -1 : 0;
    }

    public get dateSortIndicator() {
        return this.sortBy === ImageSortBy.date ? this.isAscending ? 1 : -1 : 0;
    }

    public sortByTitle() {
        this.toggleTitleSort.emit(null);
    }

    public sortBySize() {
        this.toggleSizeSort.emit(null);
    }

    public sortByDate() {
        this.toggleDateSort.emit(null);
    }

    public toggleTagSelector() {
        this.showTagSelector = !this.showTagSelector;
    }
}
