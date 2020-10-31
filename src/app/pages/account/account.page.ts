import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: string;
  prestamos:any;
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(private route: ActivatedRoute,private storage: Storage,private router: Router) {
    //Creo que todo lo que llevaba el id ya no va
    this.idDetatail=route.snapshot.paramMap.get("id"); 

    this.storage.get('dashboard').then((val) => {
      this.prestamos = JSON.parse(val);
      console.log(this.prestamos)
    });
    this.storage.get('indexCard').then((val) => {
      this.idDetatail = val;
    });
  }

  ngOnInit() {
   
    this.segment = "creditos";
  }

  onDetailLoan(){
    this.storage.get('indexCard').then((val) => {
      this.id = val;
      this.router.navigate(['/detailloan/' + this.id]);
    });
  }

  segmentChanged(event){
    //this.idDetatail = event.detail.value;
    //console.log(this.idDetatail)
  }
}
