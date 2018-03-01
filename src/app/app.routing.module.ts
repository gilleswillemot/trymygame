import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InfoComponent } from './info/info.component';
import { HiscoresComponent } from './hiscores/hiscores.component';
import { AuthGuardService } from './user/auth-guard.service';
import { PreloadAllModules } from '@angular/router/src/router_preloader';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserModule } from './user/user.module';
import { GameCanvasComponent } from './game/game-canvas/game-canvas.component';


const appRoutes: Routes = [
  //{ path: 'profiel/:userId', component: ProfielComponent },
  //{ path: 'profiel', component: ProfielComponent },
  // { path: 'game', component: GameComponent },  
  { path: 'homepage'/*, canActivate: [AuthGuardService]*/, component: HomepageComponent },
  //{ path: 'game', canActivate: [AuthGuardService], loadChildren: '../game/game.module#GameModule' },
  // { path: 'game', component: GameComponent },
  { path: 'game', canActivate: [AuthGuardService], component: GameCanvasComponent },
  { path: 'info', component: InfoComponent },  
  { path: 'hiscores', component: HiscoresComponent }, 
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent },   
  { path: '', redirectTo: 'homepage', pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    UserModule,
   RouterModule.forRoot(appRoutes/*, {preloadingStrategy: PreloadAllModules}*/)
    
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
