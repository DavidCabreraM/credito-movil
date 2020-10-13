import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  segment: String;
  //@ViewChild(IonSegment) segment: IonSegment;

  idDetatail: string;
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(private route: ActivatedRoute) {
    this.idDetatail=route.snapshot.paramMap.get("id");
    console.log(this.idDetatail)
  }

  ngOnInit() {
    this.idDetatail=this.route.snapshot.paramMap.get("id");
    console.log(this.idDetatail)
    this.segment = "creditos";
  }

  segmentChanged(event){
    this.idDetatail = event.detail.value;
    console.log(this.idDetatail)
  }
}
