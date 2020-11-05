import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
})
export class ChangeLanguageComponent implements OnInit {

  constructor(private translate: TranslateService) { }
  language = [
    {
      "text": "Español",
      "val":"es"
    },
    {
      "text": "English",
      "val":"en"
    } 
  ]
  ngOnInit() {}


  changeLanguage(){
    this.translate.use('en');
  }
}
