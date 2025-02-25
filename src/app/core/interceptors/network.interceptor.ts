import { catchError } from 'rxjs'
import { inject } from '@angular/core'
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'

import { ToasterStore } from '../../shared/stores/toaster.store'

export const networkInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToasterStore)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!error.status) {
        toaster.error(
          'Our server is unavailable, please try again.'
        )
      }
      throw error
    })
  );
};
