import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageComponent } from '@components/modals/change-language/change-language.component';

@Component({
  selector: 'app-cards-buttons',
  templateUrl: './cards-buttons.component.html',
  styleUrls: ['./cards-buttons.component.scss'],
})
export class CardsButtonsComponent implements OnInit {
  public url_account = 'account';
  optionLanguage="es"
  languagesList = [
    {
      text:"Español",
      value:"es"
    },
    {
      text:"English",
      value:"en"
    },
  ]

  constructor(private router: Router, private storage: Storage,  private translate: TranslateService) {
    translate.setDefaultLang('es');
    let language = translate.getBrowserLang()
    translate.use(language);
   }

  ngOnInit() {}

  onOptionsButtons(url){
    this.storage.set('indexCard','0').then(()=>{
      this.router.navigate([url]);
    });
    
  }
}
