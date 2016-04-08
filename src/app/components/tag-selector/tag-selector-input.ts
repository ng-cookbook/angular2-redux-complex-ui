
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
    selector: '[.ui.search]'
    // host: {
    //     '(keyup)': 'onKeyUp($event)'
    // }
})
export class TagSelectorInput implements OnInit {

    @Input() public tagsList: string[];
    @Output() public addTag: EventEmitter<any> = new EventEmitter();

    constructor(private searchBox: ElementRef) {
    }

    public ngOnInit() {
        let tagMap = this.tagsList.map(tag => ({ title: tag }))
        $(this.element)
            .search({
                source: tagMap,
                minCharacters : 1,
                onSelect: (result) => {
                    this.onTagSelected(result.title)
                }
            })
    }

    // public onKeyUp(evt) {
    //     if (evt && evt.code === 'Enter') {
    //         evt.preventDefault()
    //         let inputValue = this.element.value
    //         if (inputValue) {
    //             this.addTag.emit({
    //                 text: inputValue
    //             })
    //         }
    //         this.element.value = ''
    //     }
    // }

    private onTagSelected(tag: string) {
        this.addTag.emit(tag)
    }

    private get element() {
        return this.searchBox.nativeElement
    }
}
