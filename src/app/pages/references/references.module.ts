import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferencesPageRoutingModule } from './references-routing.module';

import { ReferencesPage } from './references.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferencesPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    NgxBarcodeModule
    
  ],
  declarations: [ReferencesPage]
})
export class ReferencesPageModule {}
