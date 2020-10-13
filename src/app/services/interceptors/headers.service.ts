import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadersService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token="";
    if(JSON.parse(localStorage.getItem('user'))){
      token = JSON.parse(localStorage.getItem('user')).token;
    }
    if (!token) {
          return next.handle(req);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    });
    const reqClone = req.clone({
      headers
    });
    return next.handle(reqClone);
  }
}
