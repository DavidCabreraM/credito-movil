import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';
import { catchError, switchMap } from 'rxjs/operators';

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
          return next.handle(reqClone).pipe(catchError(this.manejarError));
        }
        return next.handle(req).pipe(catchError(this.manejarError));
      })
    )
  }

  manejarError(error: HttpErrorResponse){
    console.log("Sucedio un error")
    console.log("Aqui: ",error)

    return throwError('Error personalizado')
  }
}
