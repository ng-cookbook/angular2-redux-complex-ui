
import {Component, Input, Output, EventEmitter} from '@angular/core'
import {isMatchingTag} from '../../utils/tag-utils'

@Component({
    selector: 'tag-selector',
    templateUrl: 'app/components/tag-selector/tag-selector.html',
    styleUrls: ['app/components/tag-selector/tag-selector.css']
})
export class TagSelector {

    @Input() public tagsList: string[];
    @Input() public selectedTags: string[];
    @Output() public selectedTagsChanged: EventEmitter<any> = new EventEmitter();

    public removeSelectedTag(tag) {
        let tags = (this.selectedTags || [])
            .filter(selectedTag => !isMatchingTag(tag, selectedTag))
        this.selectedTagsChanged.emit({ tags });
    }

    public addNewTag(tag) {
        let tags = (this.selectedTags || [])
            .filter(selectedTag => !isMatchingTag(tag, selectedTag))
            .concat([tag])
        this.selectedTagsChanged.emit({ tags });
    }
}
