import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardsButtonsComponent } from './cards-buttons.component';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [
    CardsButtonsComponent,
    RouterModule,
    TranslateModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports:[
    CardsButtonsComponent
  ]
})
export class CardsButtonsModule { }
