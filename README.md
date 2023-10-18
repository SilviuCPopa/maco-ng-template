

# maco-ng-template

Material Core Angular Template is a library which help integrating angular forms and material components in an simpler way.

## Getting started

Install package

```
npm install maco-ng-template
```

Import angular gmaps module into your app's module:

    import {NgModule} from '@angular/core';
    import {MacoNgCoreModule} from 'maco-ng-template';

    @NgModule({
     imports: [MacoNgCoreModule]
     })
     export class AppModule{}

 Finally connect the component in  template:
```

  <maco-form-container [formContainer]="formContainer"
                        (formChanged)="onFormChanged($event)"></maco-form-container>

  <maco-form-action [key]="formContainer.key" [actions]="formContainer.actions"></maco-form-action>

  ```

Example of a formContainer object:
```
formContainer = {
	key:  'form-container-example',
	width:  500,
	title:  'Form title',
	columns:  [
    {
      renderType: RenderType.COLUMN,
      items: [
        new FormViewHiddenItemModel({
          label: '',
          key: 'hidden-field',
          value: null,
          editable: false,
          width: 0,
        }),
        new FormViewTextItemModel({
          label: 'Input text field',
          key: 'input-text',
          editable: true,
          value: 'text',
          validators: [Validators.required],
        }),
        new FormViewTextItemModel({
            label: 'Input number field',
            key: 'input-number',
            fieldType: 'number',
            editable: true,
            value: 10,
        }),
        new FormViewDropdownItemModel({
            label: 'Dropdown input',
            key: 'dropdown',
            editable: true,
            value: '1',
            options: [
                {
                    id: '1',
                    name: 'option-1',
                    value: '1'
                },
                {
                    id: '2',
                    name: 'option-2',
                    value: '2'
                }
            ]
        }),
        new FormViewTextAreaItemModel({
            label: 'Textarea input',
            key: 'textarea',
            editable: true,
            value: defaultDescription,
            validators: [Validators.required],
        }),
        new FormViewDateItemModel({
          label: 'Date input',
          key: 'date',
          editable: true,
          value: new Date(),
          validators: [Validators.required],
        }),
      ],
	actions: [{
	    label: 'Create',
	    key: EntityDialogOperation.CANCEL,
	    matColor: 'primary',
	    primary: true,
	  },
	  {
	    label: 'Cancel',
	    key: EntityDialogOperation.CANCEL,
	  }]
	}
```

All suported form fields:

 - FormViewAutocompleteItemModel
 - FormViewBooleanItemModel
 - FormViewChipsAutocompleteModel
 - FormViewDateItemModel
 - FormViewDateTimeItemModel
 - FormViewDropdownItemModel
 - FormViewHiddenItemModel
 - FormViewPlacesItemModel
 - FormViewRadioItemModel
 - FormViewTextAreaItemModel
 - FormViewTextItemModel
 - FormViewTimePickerItemModel

 ## Documentation
#### API reference for Maco NG Template
    import { MacoNgCoreModule } from 'maco-ng-template'
#### FormContainerComponent
Component responsible for managing the available material form fields components

Selector: `maco-form-container`

**Properties**

| Name | Description |
|------|-------------|
| @Input()
  formContainer: FormContainer| Container object containing the form configuration such as title, width, actions etc |
| @Output()
  formChanged: EventEmitter<UntypedFormGroup>| Event triggered whenever the form group changed |
| @Output()
  formItemChanged: EventEmitter<FormViewItem>| Event triggered whenever any form control changed

#### FormDialogComponent
Component responsible for rendering the forms using modal
```
import { DialogService, FormDialogComponent } from 'maco-ng-template'

 constructor(private dialogService: DialogService) {}

 showFormInPopup() {
  this.formDialogRef = this.dialogService.openDialog(FormDialogComponent, {
      data: {
        key: 'dialog-form-key',
        width: 500,
        title: 'Dummy form',
        columns:  [
          {
            renderType: RenderType.COLUMN,
            items: [
              new FormViewHiddenItemModel({
                label: '',
                key: 'hidden-field',
                value: null,
                editable: false,
                width: 0,
              }),
              new FormViewTextItemModel({
                label: 'Input text field',
                key: 'input-text',
                editable: true,
                value: 'text',
                validators: [Validators.required],
              })
            ],
            actions: [
              {
                label: 'Create',
                key: EntityDialogOperation.CREATE,
                matColor: 'primary',
                primary: true,
              }
            ]
          }
        ]
    });
    this.onDialogClose();
}

 onDialogClose() {
  this.formDialogRef.afterClosed().pipe().subscribe( (action: DialogAction) => {
    if (action?.key === EntityDialogOperation.CREATE) {
      // process data
      }
    }
  }
```

### FormItemUpdateService
Service for managing dynamic data and enable/disable form inputs

Methods of updater:

- disableFormItem(key: string);
- enableFormItem(key: string);
- update(key: string, value: FormViewItemUpdate);
- setAutocompleteItems(key: string, items: FormViewOptions[])

Observables:

- initialized$: Subject<string>(); // trigger when the input changes in initialized
- itemUpdated$: Subject<FormViewItemUpdate>(); // trigger when the input value is changed

```

 const formItemKey = 'dummy-form-item';
 const formItemKey2 = 'dummy-form-item2';

 const autocompleteItems = [
    {
        id: '1',
        name: 'option-1',
        value: '1'
    },
    {
        id: '2',
        name: 'option-2',
        value: '2'
    }
  ];

 // Example of dynamically update values
 updateFormItems() {
  this.formItemUpdateService.disableFormItem(formItemKey2);

  // Update dropdown autocomplete form input
  this.formItemUpdateService.setAutocompleteItems(formItemKey, autocompleteItems);

  // Update generic form input field
  this.formItemUpdateService.update(formItemKey2, {
    key: dummy-form-item2,
    label: 'new label',
    value: 'new value'
  });
 }

 // Listen of form autocomplete update value event
listenForAutocompleteItemsChanges(formItemKey: string) {
   this.formItemUpdateService.initialized$
    .pipe(
      filter(value => value === formItemKey)
    ).subscribe(() => {
        // subscribe for the desired formItem update event
        this.formItemUpdateService.itemUpdated$[formItemKey].subscribe(option => {
          this.formItemUpdateService.enableFormItem(formItemKey2);
          // process data
        });
      });
  }
```


## Development

### Prepare your environment

Install local dev dependencies: `npm install` while current directory is this repo.

### Development server

Run `npm start` to start a development server on a port 4200.

Open `http//:localhost:4200` on your browser.

## Tests

Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

## License

MIT
