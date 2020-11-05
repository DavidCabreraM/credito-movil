import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  httpOptions: any;
  key: any;
  url = "https://jmaldama-proxy.herokuapp.com/https://jmaldama-credito-movilapi.herokuapp.com/";
  
  constructor(private http: HttpClient) {
    if(JSON.parse(localStorage.getItem('user'))){
      this.key = JSON.parse(localStorage.getItem('user')).token;
      console.log(this.key);
    }
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.key
      })
    };
  }

  //prestamo

  public getMoviments(id): Observable<any> {
    return this.http.get(this.url+"prestamo/"+id+"/movimientos");
  }

  public getDetails(id): Observable<any> {
    return this.http.get(this.url+"prestamo/"+id+"/detalle");
  }

  public updateDetails(): Observable<any> {
    return this.http.get(this.url+"usuarios/syncloandata");
  }

  public dashboard(): Observable<any>{
    return this.http.get(this.url + 'dashboard/')
    .pipe(
      delay(500)
    );
   }

   public references(): Observable<any>{
    return this.http.get(this.url + 'usuarios/referenciaspago')
    .pipe(
      delay(500)
    );
   }

  public selfi(noaccount: string){
    return this.http.get(this.url + 'usuarios/' + noaccount + '/selfi', {responseType: 'blob'});
  }

  public parameter(): Observable<any>{
    return this.http.get(this.url + 'parametros');
  }

  public prestamo(body): Observable<any>{
    console.log(JSON.stringify(body));
    return this.http.post(this.url + 'prestamo', JSON.stringify(body));
  }
 
}
