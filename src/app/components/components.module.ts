import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentCardsComponent } from './payment-cards/payment-cards.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardsButtonsComponent } from './cards-buttons/cards-buttons.component';
import { CardsLoanComponent } from './cards-loan/cards-loan.component';
import { PaymentComponent } from './modals/payment/payment.component';
import { PaymentListComponent } from './modals/payment-list/payment-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ValidationErrorsComponent,
    PaymentCardsComponent,
    SpinnerComponent,
    CardsButtonsComponent,
    CardsLoanComponent,
    PaymentComponent,
    PaymentListComponent
  ],
  exports:[
    HeaderComponent,
    ValidationErrorsComponent,
    PaymentCardsComponent,
    SpinnerComponent,
    CardsButtonsComponent,
    CardsLoanComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ]
})
export class ComponentsModule { }
