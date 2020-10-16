import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-cards',
  templateUrl: './payment-cards.component.html',
  styleUrls: ['./payment-cards.component.scss'],
})
export class PaymentCardsComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {}

}
