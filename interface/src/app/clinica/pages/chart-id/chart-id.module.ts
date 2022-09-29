import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartIdPageRoutingModule } from './chart-id-routing.module';

import { ChartIdPage } from './chart-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartIdPageRoutingModule
  ],
  declarations: [ChartIdPage]
})
export class ChartIdPageModule {}
