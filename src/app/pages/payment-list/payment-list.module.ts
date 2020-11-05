import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentListPageRoutingModule } from './payment-list-routing.module';

import { PaymentListPage } from './payment-list.page';
import { ComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentListPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PaymentListPage]
})
export class PaymentListPageModule {}
