import {
  HttpInterceptorFn,
} from '@angular/common/http';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request to add the authentication header.
  const newReq = req.clone({
      withCredentials: true, // Ensures cookies are sent with the request
  });
  return next(newReq);
};

