import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailloanPage } from './detailloan.page';

const routes: Routes = [
  {
    path: '',
    component: DetailloanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailloanPageRoutingModule {}
