import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserIdPageRoutingModule } from './user-id-routing.module';

import { UserIdPage } from './user-id.page';
import {
  NgxMaskModule,
  // IConfig
} from 'ngx-mask';

import { CpfPipe } from '../../../pipe/cpf.pipe';

// export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserIdPageRoutingModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [UserIdPage, CpfPipe]
})
export class UserIdPageModule {}
