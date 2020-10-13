import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'image/png',
        'Authorization': "Bearer "+this.key
      })
    };
  }

  //prestamo

  public getMoviments(id): Observable<any> {
    return this.http.get(this.url+"prestamo/"+id+"/movimientos", this.httpOptions);
  }

  public getDetails(id): Observable<any> {
    return this.http.get(this.url+"prestamo/"+id+"/detalle", this.httpOptions);
  }

  public dashboard(): Observable<any>{
    return this.http.get(this.url+ 'dashboard/',this.httpOptions);

   }

  public selfi(noaccount:string): Observable<any>{
    console.log(this.httpOptions);
    console.log(this.url + 'usuarios/' + noaccount + '/selfi');
    this.http.get(this.url + 'usuarios/' + noaccount + '/selfi', this.httpOptions).subscribe(data=>{
      console.log(data); 
    });
    return this.http.get(this.url + 'usuarios/' + noaccount + '/selfi', this.httpOptions);
  }
}
