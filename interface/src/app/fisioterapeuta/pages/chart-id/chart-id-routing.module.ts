import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartIdPage } from './chart-id.page';

const routes: Routes = [
  {
    path: '',
    component: ChartIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartIdPageRoutingModule {}
