import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableComponent } from './datatable.component';
import { CommonModule } from '@angular/common';
import { MaterialModulesModule } from '../../material.module';
import { DatatableOptionProperties } from './datatable.model';

describe('DatatableComponent', () => {
  let component: DatatableComponent;
  let fixture: ComponentFixture<DatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        MaterialModulesModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open context menu', () => {
    spyOn(component.contextMenu, 'openMenu');
    component.onContextMenu(<MouseEvent> {
      clientX: 0,
      clientY: 0,
      preventDefault: () => {}
    }, null);
    expect(component.contextMenu.openMenu).toHaveBeenCalled();
  });

  it('should emit event on row action', () => {
    const rowProperties: DatatableOptionProperties = {
      label: 'rowLabel',
      action: 'edit',
      icon: 'icon'
    };
    spyOn(component.executeRowAction, 'emit');
    component.onExecuteRowAction(rowProperties, null);
    expect(component.executeRowAction.emit).toHaveBeenCalledWith(rowProperties);
  });
});
