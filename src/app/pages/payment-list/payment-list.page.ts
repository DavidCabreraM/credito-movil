import { Component, Input, OnInit } from '@angular/core';
import { PaymentComponent } from '@components/modals/payment/payment.component';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.page.html',
  styleUrls: ['./payment-list.page.scss'],
})
export class PaymentListPage implements OnInit {
  payments: any;
  nextP: any;
  account = "0";
  dateCurrent = new Date();
  constructor(
    private modalController: ModalController,
    private storage: Storage,
    private translate: TranslateService
    ) {
    this.storage.get('nextP').then((val) => {
      this.nextP = JSON.parse(val);
    })
    this.storage.get('payments').then((val) => {
      this.payments = JSON.parse(val);
      this.account = this.payments[0].account_no
      console.log(this.payments)
    })
  }

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
