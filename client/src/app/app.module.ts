import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkedpointDetailComponent } from './components/markedpoint-detail/markedpoint-detail.component';
import { MarkedpointComponent } from './components/markedpoint/markedpoint.component';
import { OlMapComponent } from './components/ol-map/ol-map.component';
import { AddMarkedpointComponent } from './components/add-markedpoint/add-markedpoint.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { AuthInjector } from './helpers/auth-injector';

@NgModule({
  declarations: [
    AppComponent,
    MarkedpointDetailComponent,
    MarkedpointComponent,
    OlMapComponent,
    AddMarkedpointComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInjector, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
