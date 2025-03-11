import {
  HttpInterceptorFn,
} from '@angular/common/http';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request to add the authentication header.
  const newReq = req.clone({

  });
  return next(newReq);
};

