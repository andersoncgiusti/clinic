import { CalModalPageModule } from './../pages/cal-modal/cal-modal.module';
import { IonicModule } from '@ionic/angular';
import { NgModule,LOCALE_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { NgCalendarModule } from 'ionic2-calendar';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    NgCalendarModule,
    CalModalPageModule,
    Ng2SearchPipeModule
  ],
  declarations: [Tab2Page],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class Tab2PageModule {}
