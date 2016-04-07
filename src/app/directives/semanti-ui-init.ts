
import {Directive, ElementRef} from 'angular2/core'

declare var $: any

@Directive({
    selector: '.ui.dropdown'
})
export class InitializeDropdown {
    constructor(el: ElementRef) {
        $(el.nativeElement).dropdown();
    }
}
