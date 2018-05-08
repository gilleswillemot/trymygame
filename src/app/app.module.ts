import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InfoComponent } from './info/info.component';
import { GameCanvasComponent } from './game/game-canvas/game-canvas.component';
//import { GameOverlayComponent } from './game/game-overlay/game-overlay.component';
//import { UserComponent } from './user/user.component';
import { HiscoresComponent } from './hiscores/hiscores.component';
import { HiscoreDataService } from './hiscores/hiscore-data.service';
import { MatMenuModule } from '@angular/material/menu';
import { UserModule } from './user/user.module';
import { ProfileComponent } from './profile/profile.component';
import { AlertModule } from './alert/alert.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { basehttpInterceptorProviders, httpInterceptorProviders  }
//  from './http-interceptors/index';
import { HiscoreModule } from './hiscores/hiscore.module';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    // GameComponent,
    PageNotFoundComponent,
    InfoComponent,
    GameCanvasComponent,
    // GameOverlayComponent,
    // UserComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    MatMenuModule,
    UserModule,
    AlertModule,
    HiscoreModule,

    AppRoutingModule //always as last import
  ],
  providers: [/*basehttpInterceptorProviders,
    httpInterceptorProviders,*/
    { provide: LOCALE_ID, useValue: 'nl' },//nl taal instellen (voornamelijk voor 3rdparty software) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
