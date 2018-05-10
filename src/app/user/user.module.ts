import { AuthGuardService } from './auth-guard.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { basehttpInterceptorProviders } from '../http-interceptors/hiscore';
//import { UserDataService } from '../services/user-data.service';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    UserInformationComponent
  ],
  providers: [
    AuthenticationService, 
    // basehttpInterceptorProviders,
    AuthGuardService
  ],
  exports: [
    UserInformationComponent
  ]
})
export class UserModule { }
