import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestReceivedPage } from './request-received.page';

const routes: Routes = [
  {
    path: '',
    component: RequestReceivedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestReceivedPageRoutingModule {}
