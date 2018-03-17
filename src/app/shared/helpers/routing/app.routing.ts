import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../../../component/login/index';
import { AuthGuard } from '../../helpers/guards/index';
import { HomeComponent } from "../../../component/home/home.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
