import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-buttons',
  templateUrl: './cards-buttons.component.html',
  styleUrls: ['./cards-buttons.component.scss'],
})
export class CardsButtonsComponent implements OnInit {
  public url_account = 'account';

  constructor(private router: Router) { }

  ngOnInit() {}

  onOptionsButtons(url: number){
    this.router.navigate([url]);
  }

}
