import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken}` },
      });
    }

    return next.handle(req).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          const enteteAuthorization = evt.headers.get('Authorization');
          if (enteteAuthorization) {
            const token = enteteAuthorization.split(/Bearer\s+(.*)$/i)[1];
            this.authService.setJwtToken(token);
          }
        }
      })
    );
  }
}
