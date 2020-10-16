import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarglobalesService {

  private avatar = '';
  private client = '';

  constructor() { }

  setavatar(avatar){
    this.avatar = avatar;
  }

  getavatar(){
    return this.avatar;
  }

  setClient(client){
    this.client = client;
  }

  getClient(){
    return this.client;
  }

}
