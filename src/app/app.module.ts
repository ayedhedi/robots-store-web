import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }    from '@angular/forms';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing }        from './shared/helpers/routing/app.routing';
import { AlertComponent } from './shared/helpers/directives/index';
import { AuthGuard }      from './shared/helpers/guards/index';
import { JwtInterceptor } from './shared/helpers/interceptor/jwt.interceptor';

import { AppComponent } from './app.component';
import { ApiService, AlertService, AuthenticationService } from "./shared/service/index";
import { LoginComponent } from "./component/login/login.component";
import { HomeComponent } from "./component/home/home.component";
import { RobotComponent } from './component/robot/robot.component';
import { RobotDetailComponent } from './component/robot-detail/robot-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent,
    RobotComponent,
    RobotDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    InfiniteScrollModule,
    NgbModule.forRoot()
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
