import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[tfFormItemContentProxy]',
    standalone: false
})
export class FormItemContentProxyDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
