import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  segment: String;
  //@ViewChild(IonSegment) segment: IonSegment;
  accountNumber='000000056';
  idDetatail: string;
  prestamos:any;
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(private route: ActivatedRoute,private storage: Storage) {
    //Creo que todo lo que llevaba el id ya no va
    this.idDetatail=route.snapshot.paramMap.get("id");

    this.storage.get('dashboard').then((val) => {
      this.prestamos = JSON.parse(val);
    });
    this.storage.get('indexCard').then((val) => {
      this.idDetatail = val;
    });
  }

  ngOnInit() {
    this.segment = "creditos";
  }

  segmentChanged(event){
    //this.idDetatail = event.detail.value;
    //console.log(this.idDetatail)
  }
}
