import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyforLoanPage } from './applyfor-loan.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyforLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyforLoanPageRoutingModule {}
