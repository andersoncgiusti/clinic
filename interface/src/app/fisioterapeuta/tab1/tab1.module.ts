import { CalModalPageModule } from './../pages/cal-modal/cal-modal.module';
import { IonicModule } from '@ionic/angular';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { NgCalendarModule } from 'ionic2-calendar';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [Tab1Page],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class Tab1PageModule {}
