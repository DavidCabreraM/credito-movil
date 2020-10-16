import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeadersService implements HttpInterceptor{

  constructor(private storage: Storage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let promise = this.storage.get('user')

    return from(promise).pipe(
      switchMap(usuario => {
        if(usuario){
          const token = JSON.parse(usuario).token
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+token
          });
          const reqClone = req.clone({
            headers
          });
          return next.handle(reqClone);
        }
        return next.handle(req);
      })
    )
  }
}
