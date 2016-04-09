
import {
    Directive,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    OnInit,
    OnDestroy
} from 'angular2/core'

declare var $: any

@Directive({
    selector: '[.ui.search]'
})
export class TagSelectorInput implements OnInit, OnDestroy {

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
                },
                templates: {
                    message: (message, type) => {
                        let html = ''
                        if(message != null && type != null) {
                            html = [
                                `<div class="message ${type}">`,
                                type === 'empty' ?
                                    `<div class="description">Adding new tag ...</div>` :
                                    `<div class="description">${message}</div>`,
                                `</div>`
                            ].join('')
                        }
                        return html
                    }
                }
            })
    }

    public ngOnDestroy() {
        $(this.element).search('destroy');
    }

    private onTagSelected(tag: string) {
        this.addTag.emit(tag)
    }

    private get element() {
        return this.searchBox.nativeElement
    }
}

@Directive({
    selector: '[selectTagOnEnter]',
    host: {
        '(keyup)': 'onKeyUp($event)'
    }
})
export class SelectTagOnEnter {

    @Output('selectTagOnEnter') public addTag: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef) {
    }

    public onKeyUp(evt) {
        if (evt && evt.code === 'Enter') {

            evt.preventDefault()
            evt.stopPropagation()

            let tag = this.el.nativeElement.value
            if (tag) {
                this.addTag.emit(tag)
            }

            this.el.nativeElement.value = ''
        }
    }
}
