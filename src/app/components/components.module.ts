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
import { NgxBarcodeModule } from 'ngx-barcode';
import { EstablishmentsComponent } from './establishments/establishments.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ValidationErrorsComponent,
    PaymentCardsComponent,
    SpinnerComponent,
    CardsButtonsComponent,
    CardsLoanComponent,
    EstablishmentsComponent
  ],
  exports:[
    HeaderComponent,
    ValidationErrorsComponent,
    PaymentCardsComponent,
    SpinnerComponent,
    CardsButtonsComponent,
    CardsLoanComponent,
    EstablishmentsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    NgxBarcodeModule
  ]
})
export class ComponentsModule { }
