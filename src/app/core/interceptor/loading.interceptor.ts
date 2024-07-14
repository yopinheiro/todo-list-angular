import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public loadingService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    return next.handle(request).pipe(finalize(() => this.loadingService.hide()));
  }
}
