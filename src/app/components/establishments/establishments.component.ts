import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.scss'],
})
export class EstablishmentsComponent implements OnInit {
  public establecimientos: any = [
    {url: '/assets/img/referencias/1.jpg'}
  ];
  
  public reference: string;
  constructor(private popoverController: PopoverController, private storage: Storage) { }
  
  ngOnInit() {
    this.storage.get('reference').then(val=>{
      this.reference = val;
    });
  }

}
