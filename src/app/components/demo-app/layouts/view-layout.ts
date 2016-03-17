
import {Component} from 'angular2/core'
import {RouteParams} from 'angular2/router'
import {TitleBar} from '../title-bar'
import {Http} from 'angular2/http'

@Component({
    selector: 'view-layout',
    directives: [TitleBar],
    templateUrl: 'app/components/demo-app/layouts/view-layout.html',
    styleUrls: ['app/components/demo-app/layouts/view-layout.css']
})
export class ViewLayout {

    public imageUrl: string
    public imageInfo: any = {}

    constructor(params: RouteParams, http: Http) {
        let imageId = params.get('id')
        this.imageUrl = ['/api', 'images', imageId, 'image'].join('/')
        http.get(['/api', 'images', imageId].join('/'))
            .map(res => res.json())
            .map(imageInfo => Object.assign(imageInfo, {
                dateTaken: new Date(imageInfo.dateTaken)
            }))
            .subscribe(
                (imageInfo: any) => this.imageInfo = imageInfo,
                console.log.bind(console))
    }
}
