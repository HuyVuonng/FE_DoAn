import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const Interceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    const AuthRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(AuthRequest);
  } else {
    return next(request);
  }
};
