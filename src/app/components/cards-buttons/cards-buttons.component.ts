import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cards-buttons',
  templateUrl: './cards-buttons.component.html',
  styleUrls: ['./cards-buttons.component.scss'],
})
export class CardsButtonsComponent implements OnInit {
  public url_account = 'account';

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {}

  onOptionsButtons(url: number){
    this.storage.set('indexCard','0').then(()=>{
      this.router.navigate([url]);
    });
    
  }

}
