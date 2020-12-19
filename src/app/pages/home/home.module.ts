import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { ComponentsModule } from '../../components/components.module';
import { CardsLoanModule } from '@components/cards-loan/cards-loan.module';
import { CardsButtonsModule } from '@components/cards-buttons/cards-buttons.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    CardsLoanModule,
    CardsButtonsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
