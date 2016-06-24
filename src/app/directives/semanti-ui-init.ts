
import {Directive, ElementRef, OnInit, OnDestroy} from '@angular/core'

declare var $: any

@Directive({
    selector: '.ui.dropdown'
})
export class InitializeDropdown implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        $(this.el.nativeElement).dropdown();
    }

    public ngOnDestroy() {
        $(this.el.nativeElement).dropdown('destroy');
    }
}
