
import {Directive, ElementRef, OnDestroy} from 'angular2/core'

declare var $: any

@Directive({
    selector: '.ui.dropdown'
})
export class InitializeDropdown implements OnDestroy {
    constructor(private el: ElementRef) {
        $(this.el.nativeElement).dropdown();
    }

    ngOnDestroy() {
        $(this.el.nativeElement).dropdown('destroy');
    }
}
