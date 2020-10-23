import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loandata',
  templateUrl: './loandata.page.html',
  styleUrls: ['./loandata.page.scss'],
})
export class LoandataPage implements OnInit {
  public titulo: string;
  public segment: string;
  public prestamo_id: string;
  public data: any;

  constructor(private storage: Storage,
    private translate: TranslateService) {
    this.segment = 'Crédito';
    this.titulo = 'LOANDATA';
  }

  ngOnInit() {

    this.storage.get('dashboard').then((val) => {
        this.data = JSON.parse(val);
        console.log(this.data);
    });
  }

}
