import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit {
  @Input() payments: any;
  @Input() nextP: any;
  dateCurrent = new Date();
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async paymentModal(data) {
    const modal = await this.modalController.create({
      component: PaymentComponent,
      componentProps: {
        'payment': data,
        'periodoTotal': this.payments.length,
        'nextP': this.nextP
      },
      cssClass: "size-modal"
    });
    return await modal.present();
  }
}
