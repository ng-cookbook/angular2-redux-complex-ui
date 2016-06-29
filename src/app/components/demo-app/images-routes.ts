
import {RouterConfig} from '@angular/router'
import {ImagesSection} from './images-section'
import {ListLayout} from './layouts/list-layout'
import {ListGroupLayout} from './layouts/list-group-layout'
import {ViewLayout} from './layouts/view-layout'
import {EditLayout} from './layouts/edit-layout'

export const imagesRoutes: RouterConfig = [
    {
        path: 'images',
        component: ImagesSection,
        children: [
            { path: 'list', component: ListLayout },
            { path: 'groups', component: ListGroupLayout },
            { path: 'view/:id', component: ViewLayout },
            { path: 'edit/:id', component: EditLayout }
        ]
    }
]
