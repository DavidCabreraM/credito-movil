import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailloanPageRoutingModule } from './detailloan-routing.module';

import { DetailloanPage } from './detailloan.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailloanPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailloanPage]
})
export class DetailloanPageModule {}
