import { Component, Input, OnInit } from '@angular/core';
import { DialogAction } from '../dialog.interface';
import { DialogActionSelectedService } from '../services/dialog-action-selected.service';

@Component({
  selector: 'maco-form-action',
  templateUrl: './dialog-action.component.html',
  styleUrls: ['./dialog-action.component.scss']
})
export class FormActionComponent implements OnInit {

  @Input() key: string;

  @Input() actions: DialogAction[];

  constructor(
    private actionSelectedService: DialogActionSelectedService) { }

  ngOnInit(): void {
    this.actionSelectedService.registerAction(this.key);
  }

  onActionClicked(action: DialogAction): void {
    this.actionSelectedService.selectAction(this.key, action);
  }
}
