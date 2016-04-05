
import _ from 'lodash'
import {
    Directive,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    OnInit
} from 'angular2/core'

declare var $: any

@Directive({
    selector: '[tag-selector-input]',
    host: {
        '(keyup)': 'onKeyUp($event)'
    }
})
export class TagSelectorInput implements OnInit {

    @Input() public tagsList: string[];
    @Output() public addTag: EventEmitter<any> = new EventEmitter();

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
            name: 'tags',
            source: matcher
        }

        $(this.element).typeahead(options, dataSet)
    }

    public onKeyUp(evt) {
        if (evt && evt.code === 'Enter') {
            evt.preventDefault()
            let inputValue = this.element.value
            if (inputValue) {
                this.addTag.emit({
                    text: inputValue
                })
            }
            this.element.value = ''
        }
    }

    private get element() {
        return this.typeaheadElement.nativeElement
    }

}
