import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoandataPageRoutingModule } from './loandata-routing.module';

import { LoandataPage } from './loandata.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoandataPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [LoandataPage]
})
export class LoandataPageModule {}
