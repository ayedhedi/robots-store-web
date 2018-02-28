import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApiService } from "./shared/service/api.service";
import { RobotsComponent } from './component/robots/robots.component';


@NgModule({
  declarations: [
    AppComponent,
    RobotsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
