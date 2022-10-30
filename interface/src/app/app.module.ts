import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgxMaskModule,
  // IConfig
} from 'ngx-mask';

// export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;
import { CpfPipe } from './pipe/cpf.pipe';

import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [AppComponent, CpfPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    Ng2SearchPipeModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
