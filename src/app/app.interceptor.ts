import {
  HttpInterceptorFn,
} from '@angular/common/http';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
      withCredentials: true, // Ensures cookies are sent with the request
  });
  return next(newReq);
};

