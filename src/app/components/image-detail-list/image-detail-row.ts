
import {Component, Input} from 'angular2/core'

@Component({
    selector: '.image-detail-row',
    template: `
        <td>{{rowData.name}}</td>
        <td>{{rowData.size | number}}</td>
        <td>{{rowData.dateTaken | date}}</td>
        <td>{{rowData.width | number}} x {{rowData.height | number}}</td>
        <td>{{rowData.portrait ? "Portrait" : ""}}{{rowData.landscape ? "Landscape" : ""}}</td>
        <td>{{rowData.tags}}</td>
    `
})
export class ImageDetailRow {
    @Input() public rowData: any;
}
