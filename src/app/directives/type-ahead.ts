
import _ from 'lodash'
import {
    Directive,
    Input,
    ElementRef,
    OnInit
} from 'angular2/core'

declare var $: any

@Directive({
    selector: '[type-ahead]'
})
export class TypeAheadControl implements OnInit {

    @Input() tagsList: string[];

    constructor(private typeaheadElement: ElementRef) {
    }

    public ngOnInit() {
        let tagsList = this.tagsList;
        let matcher = (query, callback) => {
            let queryRegexText = _.escapeRegExp(query)
            let tagRegex = new RegExp(queryRegexText, 'i')
            let selectedTags = _.filter(tagsList, tag => tagRegex.test(tag))
            callback(selectedTags)
        }

        let options = {
            hint: true,
            highlight: true,
            minLength: 1,
            classNames: {
                menu: 'dropdown-pane',
                open: 'is-open'
            }
        }
        let dataSet = {
            name: 'states',
            source: matcher
        }

        $(this.typeaheadElement.nativeElement).typeahead(options, dataSet)
    }
}
