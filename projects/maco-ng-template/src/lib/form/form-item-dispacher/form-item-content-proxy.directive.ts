import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[tfFormItemContentProxy]'
})
export class FormItemContentProxyDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
