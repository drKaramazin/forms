import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PhoneMaskDirective } from '../directives/phone-mask.directive';

import { AppComponent } from './app.component';

import { UtilService } from '../services/util.service';

@NgModule({
  declarations: [
    AppComponent,
    PhoneMaskDirective,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    UtilService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
