import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-referencedetail',
  templateUrl: './referencedetail.page.html',
  styleUrls: ['./referencedetail.page.scss'],
})
export class ReferencedetailPage implements OnInit {
  public titulo: string;
  public account: string;
  public reference: string;
  public segment: string;
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
  ];
  constructor( private route: ActivatedRoute, private translate: TranslateService) { 
    this.titulo = 'REFERENCES';
    translate.setDefaultLang('es');
    let language = translate.getBrowserLang();
    translate.use(language);
   }

  ngOnInit() {
    this.account = this.route.snapshot.paramMap.get('id');
    this.reference = this.route.snapshot.paramMap.get('reference');
    this.segment = this.route.snapshot.paramMap.get('segment');
    if(this.segment === 'reembolsos'){
      this.segment = 'REEMBOLSO';
    }
    
  }

  selectLanguage(langSelect){
    this.translate.use(langSelect);
  }

}
