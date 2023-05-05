import { Injectable } from '@angular/core';
import { SnackbarData, SnackbarTypeEnum } from '../snackbar/snackbar.interface';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const DEFAULT_DURATION = 2000;

@Injectable({
    providedIn: 'root'
})
export class AppNotificationService {

    constructor(private snackBar: MatSnackBar) {}

    success(message: string): void {
        this.openSnackBar({
            message,
            type: SnackbarTypeEnum.success
        });
    }

    error(message: string): void {
        this.openSnackBar({
            message,
            type: SnackbarTypeEnum.error
        });
    }

    warning(message: string): void {
        this.openSnackBar({
            message,
            type: SnackbarTypeEnum.warning
        });
    }

    private openSnackBar(snackBarData: SnackbarData): void {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
                ...snackBarData
            },
            duration: DEFAULT_DURATION,
            panelClass: [snackBarData.type]
        });
    }
}
