import { Component, OnInit, ViewChild, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import { FormItemContentProxyDirective } from './form-item-content-proxy.directive';
import { FormTypeMappingService } from '../services/form-type-mapping.service';
import { FormViewItem } from '../interfaces/form-view-item.interface';

@Component({
  selector: 'maco-form-item-dispacher',
  template: `<ng-template tfFormItemContentProxy></ng-template>`,
  styleUrls: ['./form-item-dispacher.component.scss']
})
export class FormItemDispacherComponent implements OnInit, OnDestroy {

  @Input()
  formItem: FormViewItem;

  @Input()
  key: string;

  @ViewChild(FormItemContentProxyDirective, {static: true})
  private content: FormItemContentProxyDirective;

  private componentPointer: any = null;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private formTypeMappingService: FormTypeMappingService) { }

  public ngOnInit(): void {
    this.loadComponent();
  }

  public loadComponent(): void {
    const component = this.formTypeMappingService.getComponentFromType(this.formItem.type);
    this.componentPointer = this.content.viewContainerRef.createComponent(component);
    this.componentPointer.instance.formItem = this.formItem;
    this.componentPointer.instance.containerId = this.key;
  }

  public ngOnDestroy(): void {
    this.componentPointer = null;
    this.content = null;
  }
}
