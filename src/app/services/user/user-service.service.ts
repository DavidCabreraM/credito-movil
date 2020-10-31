import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '@models/users/register';
import { Login } from '@models/users/login';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  httpOptions: any;
  key: any;
  url = "https://jmaldama-proxy.herokuapp.com/https://jmaldama-credito-movilapi.herokuapp.com/usuarios/";
  //url = "https://jmaldama-proxy.herokuapp.com/http://e7c223ef3e18.ngrok.io/usuarios/";

  constructor(private http: HttpClient) {}

  public register(form1,form2): Observable<any> {
    let r= new Register();
    r.setName = form1.name;
    r.setApellidoPaterno = form1.apellidoP;
    r.setApellidoMaterno = form1.apellidoM;
    r.setAccountNo = form1.nClient;
    r.setEmail = form1.email;
    r.setSelfie = form2.img;
    r.setCurp = form2.curp;
    r.setDateBirth = form2.dateBirth;
    r.setPhone = form2.phone;
    r.setPassword = form1.password;
    return this.http.post(this.url,r);
  }

  public login(form): Observable<any> {
    let l= new Login();

    l.setPassword = form.password;
    l.setAccountNo = form.nClient;
    return this.http.post(this.url+"login",l);
  }

  public sendImg(imageData): Observable<any> {
    let params = {
        "selfi":imageData
    }
    return this.http.post(this.url+"yo/selfi",params);
  }

  public sendCode(number): Observable<any>{
    let params = {
      "numeroMovil":number
    }
    return this.http.post(this.url+"enviarcodigo/",params);
  }

  public verificationCode(code,number): Observable<any>{
    return this.http.post(this.url+code+"/verificar/"+number,{});
  }

  public requestChange(data): Observable<any>{
    let params = {
      "account_no":data
    }
    return this.http.post(this.url+"recuperaracceso",params);
  }

  public resetPassword(form): Observable<any>{
    console.log(form)
    let params = {
      "account_no": form.nClient,
      "curp": form.curp,
      "codigo": form.code,
      "nuevo_password":form.password
    }
    return this.http.post(this.url+"confirmaracceso",params);
  }

  public changePassword(form): Observable<any>{
    console.log(form)
    let params = {
      "viejo_password":form.password,
      "nuevo_password":form.newpassword
    }
    return this.http.post(this.url+"cambiarpassword",params);
  }
}
