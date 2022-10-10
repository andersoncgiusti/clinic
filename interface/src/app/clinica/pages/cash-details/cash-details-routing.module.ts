import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashDetailsPage } from './cash-details.page';

const routes: Routes = [
  {
    path: '',
    component: CashDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashDetailsPageRoutingModule {}
