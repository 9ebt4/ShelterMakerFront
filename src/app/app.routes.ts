import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-group/login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LogincodeComponent } from './components/login-group/logincode/logincode.component';
import { LoginFailedComponent } from './components/login-group/login-failed/login-failed.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:'home', component: HomeComponent},
  {path:'logincode', component:LogincodeComponent},
  {path:'login-failed', component:LoginFailedComponent},
  {path: '**', redirectTo: ''},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  