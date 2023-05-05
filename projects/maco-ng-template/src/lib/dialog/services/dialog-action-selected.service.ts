
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogAction } from '../dialog.interface';

@Injectable({
    providedIn: 'root',
  })
  export class DialogActionSelectedService {

    actionSelected$: { [key: string]: Subject<DialogAction>} = {};

    constructor() { }

    registerAction(key: string): void {
      this.actionSelected$[key] = new Subject<DialogAction>();
    }

    selectAction(key: string, action: DialogAction): void {
      this.actionSelected$[key].next(action);
    }
  }
