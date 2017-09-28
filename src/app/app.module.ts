import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {AppRouteModule} from './app.route.module';
import {CoreModule} from './core/core.module';
import {HomeModule} from './home/home.module';

import { TareaModule } from './tarea/tarea.module';
import { DesplegableModule } from './desplegable/desplegable.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import {GrowlModule} from 'primeng/primeng';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRouteModule, CoreModule, SharedModule, GrowlModule,
    UserModule, HomeModule, TareaModule, DesplegableModule,BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
