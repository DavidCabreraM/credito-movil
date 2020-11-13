import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestReceivedPageRoutingModule } from './request-received-routing.module';

import { RequestReceivedPage } from './request-received.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestReceivedPageRoutingModule,
    TranslateModule
  ],
  declarations: [RequestReceivedPage]
})
export class RequestReceivedPageModule {}
