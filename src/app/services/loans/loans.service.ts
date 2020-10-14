import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  url = "https://jmaldama-proxy.herokuapp.com/https://jmaldama-credito-movilapi.herokuapp.com/";
  
  constructor(private http: HttpClient) {}

  //prestamo

  public getMoviments(id): Observable<any> {
    return this.http.get(this.url+"prestamo/"+id+"/movimientos");
  }

  public getDetails(id): Observable<any> {
    return this.http.get(this.url+"prestamo/"+id+"/detalle");
  }

  public dashboard(): Observable<any>{
    return this.http.get(this.url+ 'dashboard/');
  }
}
