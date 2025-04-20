import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // return next(req);

  const ngxSpinnerService = inject(NgxSpinnerService);
  
  ngxSpinnerService.show('loading-1');
  return next(req).pipe(finalize( ()=>{
ngxSpinnerService.hide('loading-1');
  } ));
};
