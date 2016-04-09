
import {Directive, ElementRef, OnInit, OnDestroy} from 'angular2/core'

declare var $: any

@Directive({
    selector: '.ui.dropdown'
})
export class InitializeDropdown implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        $(this.el.nativeElement).dropdown();
    }

    ngOnDestroy() {
        $(this.el.nativeElement).dropdown('destroy');
    }
}
