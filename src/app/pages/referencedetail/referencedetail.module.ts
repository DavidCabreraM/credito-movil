import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferencedetailPageRoutingModule } from './referencedetail-routing.module';

import { ReferencedetailPage } from './referencedetail.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBarcodeModule } from 'ngx-barcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferencedetailPageRoutingModule,
    TranslateModule,
    NgxBarcodeModule

  ],
  declarations: [ReferencedetailPage]
})
export class ReferencedetailPageModule {}
