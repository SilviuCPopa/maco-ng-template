import { UntypedFormGroup } from '@angular/forms';

export abstract class FTFormUtil {

    static triggerFormValidation(form: UntypedFormGroup) {
        const controls = Object.keys(form.controls);
        controls.forEach( control => {
            form.get(control).updateValueAndValidity();
        });
    }
}
