import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardsButtonsComponent } from './cards-buttons.component';
import { Router, RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    CardsButtonsComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    CardsButtonsComponent
  ]
})
export class CardsButtonsModule { }
