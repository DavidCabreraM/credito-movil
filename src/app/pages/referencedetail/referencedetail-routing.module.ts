import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferencedetailPage } from './referencedetail.page';

const routes: Routes = [
  {
    path: '',
    component: ReferencedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferencedetailPageRoutingModule {}
