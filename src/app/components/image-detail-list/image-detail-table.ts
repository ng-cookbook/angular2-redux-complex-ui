
import {Component, Input} from 'angular2/core'
import {ImageDetailRow} from './image-detail-row'

@Component({
    selector: 'image-detail-table',
    directives: [ImageDetailRow],
    template: `
        <table class="hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>Size (bytes)</th>
                <th>Taken</th>
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
}
