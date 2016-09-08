
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {ImagesSection} from './images-section'
import {imagesRouting} from './images-routes'
import {ListLayout} from './layouts/list-layout'
import {ListGroupLayout} from './layouts/list-group-layout'
import {ViewLayout} from './layouts/view-layout'
import {EditLayout} from './layouts/edit-layout'
import {ImageEdit} from '../image-edit/image-edit';
import {ImageGroupList} from '../image-group-list/image-group-list';
import {ImageDetailList} from '../image-detail-list/image-detail-list';
import {TitleBar} from '../title-bar/title-bar';
import {ImageView} from '../image-view/image-view';
import {ImageDetailTable} from '../image-detail-list/image-detail-table';
import {ImageDetailRow} from '../image-detail-list/image-detail-row';
import {SortableColumnHeader} from '../image-detail-list/sortable-column-header';
import {ImageTagSelector} from '../image-detail-list/image-tag-selector';
import {AddTagOnEnter, TagSelectorInput} from '../tag-selector/tag-selector-input';
import {LoadingIndicator} from '../loading-indicator/loading-indicator';
import {InitializeDropdown} from '../../directives/semanti-ui-init';
import {TagSelector} from '../tag-selector/tag-selector';

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
        EditLayout,
        TitleBar,
        ImageDetailList,
        ImageGroupList,
        ImageEdit,
        ImageView,
        ImageDetailTable,
        ImageDetailRow,
        SortableColumnHeader,
        ImageTagSelector,
        TagSelectorInput,
        AddTagOnEnter,
        LoadingIndicator,
        InitializeDropdown,
        TagSelector
    ]
})
export class ImagesModule { }

