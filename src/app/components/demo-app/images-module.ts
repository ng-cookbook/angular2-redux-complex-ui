
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {ImagesSection} from './images-section'
import {imagesRouting} from './images-routes'
import {ListLayout} from './layouts/list-layout'
import {ListGroupLayout} from './layouts/list-group-layout'
import {ViewLayout} from './layouts/view-layout'
import {EditLayout} from './layouts/edit-layout'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        imagesRouting
    ],
    declarations: [
        ImagesSection,
        ListLayout,
        ListGroupLayout,
        ViewLayout,
        EditLayout
    ]
})
export class ImagesModule { }

