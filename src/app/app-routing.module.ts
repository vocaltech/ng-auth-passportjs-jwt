import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { LogoutComponent } from './logout/logout.component'
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  //{ path: '', redirectTo: "login", pathMatch: 'full'},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "protected", component: ProtectedComponent },
  { path: "dashboard", component: DashboardComponent},
  { path: "logout", component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
