import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiscoreDataService } from './hiscore-data.service';
// import { httpInterceptorProviders } from '../http-interceptors/hiscore';
import { HiscoresComponent } from './hiscores.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../alert/alert.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { basehttpInterceptorProviders, httpInterceptorProviders  }
from '../http-interceptors/hiscore';

const routes = [
  { path: 'hiscores', component: HiscoresComponent, data: { preload: true } },
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    AlertModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HiscoresComponent
  ],
  providers: [
    httpInterceptorProviders,
    basehttpInterceptorProviders,// temporarly in comment ->Cannot instantiate cyclic dependency! 
   //InjectionToken_HTTP_INTERCEPTORS ("[ERROR ->]"): in NgModule AppModule in ./AppModule@-1:-1
  //error with the ngbmodule in appmodule  SOLUTION: npm install (angular fixed this issue)
    HiscoreDataService
  ]
})
export class HiscoreModule { }
