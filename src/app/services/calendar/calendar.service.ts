import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '@models/users/register';
import { Login } from '@models/users/login';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  url = "https://jmaldama-proxy.herokuapp.com/https://jmaldama-credito-movilapi.herokuapp.com/";
  //url = "https://jmaldama-proxy.herokuapp.com/http://e7c223ef3e18.ngrok.io/usuarios/";

  public calendar(account): Observable<any> {
    return this.http.get(this.url+"prestamo/"+account+"/calendario");
  }

}
