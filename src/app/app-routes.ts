
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
    { path: '', redirectTo: '/images/list', terminal: true }
]

export const appRouting = RouterModule.forRoot(routes)
