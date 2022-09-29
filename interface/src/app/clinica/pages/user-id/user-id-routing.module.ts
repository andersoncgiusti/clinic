import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserIdPage } from './user-id.page';

const routes: Routes = [
  {
    path: '',
    component: UserIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserIdPageRoutingModule {}
