import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyforLoanPageRoutingModule } from './applyfor-loan-routing.module';

import { ApplyforLoanPage } from './applyfor-loan.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyforLoanPageRoutingModule,
    TranslateModule
  ],
  declarations: [ApplyforLoanPage]
})
export class ApplyforLoanPageModule {}
