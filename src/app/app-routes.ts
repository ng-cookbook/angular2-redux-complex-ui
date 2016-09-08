
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
    { path: '', redirectTo: '/images/list', pathMatch: 'full' }
]

export const appRouting = RouterModule.forRoot(routes)
