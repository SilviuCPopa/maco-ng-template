import { HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    }
    return throwError({
      message: 'Something bad happened; please try again later.',
      errors: error.error?.errors
    });
  }
}
