import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../../../component/login/index';
import { AuthGuard } from '../../helpers/guards/index';
import { HomeComponent } from "../../../component/home/home.component";
import { RobotUpdateComponent} from "../../../component/robot-update/robot-update.component";
import { DashboardComponent} from "../../../component/dashboard/dashboard.component";

const appRoutes: any = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], admin: false },
  { path: 'login', component: LoginComponent},
  { path: 'robot/:id', component: RobotUpdateComponent, canActivate: [AuthGuard], admin: true},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], admin: true},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
