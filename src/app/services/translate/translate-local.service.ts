import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateLocalService {
  supportedLanguage = ['en','es-US']
  defaultLanguage = 'en'
  selectLanguage = 'en'
  constructor(private translate: TranslateService) { }

  getLanguage(){

    const userLanguage = this.translate.currentLang;
    console.log("Detecto1: ",this.translate.getBrowserLang())
    if(userLanguage=="en"){
      this.selectLanguage=this.supportedLanguage[0]
    }
    if(userLanguage=="es"){
      this.selectLanguage=this.supportedLanguage[1]
    }
    console.log("Detecto: ",this.selectLanguage)
    return this.selectLanguage
  }
}
