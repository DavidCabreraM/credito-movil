import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() payment: any;
  @Input() periodoTotal: any;
  @Input() nextP: any;
  nu = 645141
  constructor() { }

  ngOnInit() {
  }

}
