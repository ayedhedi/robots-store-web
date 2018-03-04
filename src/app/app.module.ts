import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }    from '@angular/forms';

import { routing }        from './shared/helpers/routing/app.routing';
import { AlertComponent } from './shared/helpers/directives/index';
import { AuthGuard }      from './shared/helpers/guards/index';
import { JwtInterceptor } from './shared/helpers/interceptor/jwt.interceptor';

import { AppComponent } from './app.component';
import { ApiService, AlertService, AuthenticationService } from "./shared/service/index";
import { RobotsComponent } from './component/robots/robots.component';
import { LoginComponent } from "./component/login/login.component";
import { HomeComponent } from "./component/home/home.component";


@NgModule({
  declarations: [
    AppComponent,
    RobotsComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    AuthGuard,
    ApiService,
    AlertService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
