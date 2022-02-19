import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HomeComponent} from './home/home.component';
import {DrawService} from "./shared/draw-service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatSidenavModule,
  ],
  providers: [DrawService], // корректно не работает
  bootstrap: [AppComponent]
})
export class AppModule { }
