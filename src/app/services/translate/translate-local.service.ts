import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateLocalService {
  supportedLanguage = ['en','es-US']
  defaultLanguage = 'es-US'
  constructor(private translate: TranslateService) { }

  getLanguage(){

    let userLanguage = this.translate.getBrowserLang();
    console.log("Detecto1: ",userLanguage)
    if(userLanguage=="es"){
      userLanguage="es-US"
    }
    console.log(this.supportedLanguage.includes(userLanguage)? userLanguage : this.defaultLanguage)
    return this.supportedLanguage.includes(userLanguage)? userLanguage : this.defaultLanguage
  }
}
