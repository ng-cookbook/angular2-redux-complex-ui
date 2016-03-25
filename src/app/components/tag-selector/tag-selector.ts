
import {Component, Input} from 'angular2/core'

@Component({
    selector: 'tag-selector',
    templateUrl: 'app/components/tag-selector/tag-selector.html',
    styleUrls: ['app/components/tag-selector/tag-selector.css']
})
export class TagSelector {
    @Input() public tagsList: string[];
    @Input() public selectedTags: string[];
}
