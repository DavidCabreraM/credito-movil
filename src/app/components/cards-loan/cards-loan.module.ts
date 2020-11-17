import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsLoanComponent } from './cards-loan.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CardsLoanComponent,
    TranslateModule

  ],
  exports:[
    CardsLoanComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CardsLoanModule { }
