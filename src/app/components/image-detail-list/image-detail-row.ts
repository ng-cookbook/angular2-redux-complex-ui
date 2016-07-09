import {Component, Input} from '@angular/core'
import {ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router'

@Component({
    selector: '.image-detail-row',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <td>
            <a [routerLink]="imageRouteFor(rowData)">
                <i class="fa fa-eye"></i> {{rowData.title}}
            </a>
        </td>
        <td>{{rowData.size | number}}</td>
        <td>{{rowData.dateTaken | date}}</td>
        <td>{{rowData.width | number}} x {{rowData.height | number}}</td>
        <td>{{rowData.portrait ? "Portrait" : ""}}{{rowData.landscape ? "Landscape" : ""}}</td>
        <td>{{rowData.tags}}</td>
    `
})
export class ImageDetailRow {
    @Input() public rowData: any

    private isEditRoute: boolean = false;

    constructor(
        private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.route.url
            .subscribe((urlPaths) => {
                this.isEditRoute = urlPaths[0] && urlPaths[0].path && urlPaths[0].path === "edit";
            })
    }

    public imageRouteFor(img) {
        return [
            '/images',
            this.isEditRoute ? 'edit' : 'view',
            img.id
        ]
    }
}
