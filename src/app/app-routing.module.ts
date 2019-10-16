import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/user/login',pathMatch:'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    children:[
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path:'home',component: HomeComponent,canActivate: [AuthGuard]
  },
  {
    path:'forbidden',component: ForbiddenComponent
  },
  {
    path:'adminpanel',component: AdminPanelComponent,canActivate: [AuthGuard], data:{permittedRoles:['Administrador']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }