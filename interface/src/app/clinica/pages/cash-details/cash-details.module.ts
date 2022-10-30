import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashDetailsPageRoutingModule } from './cash-details-routing.module';

import { CashDetailsPage } from './cash-details.page';
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashDetailsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CashDetailsPage]
})
export class CashDetailsPageModule {}
