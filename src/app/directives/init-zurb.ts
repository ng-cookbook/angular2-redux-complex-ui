
import {Directive, ElementRef} from 'angular2/core'

declare var $: any

@Directive({
    selector: '[init-zurb]'
})
export class InitializeZurbFoundation {

    constructor(el: ElementRef) {
        $(el.nativeElement).foundation();
    }
}
