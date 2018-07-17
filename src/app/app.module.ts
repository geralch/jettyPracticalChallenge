import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { TripsComponent } from './trips/trips.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '../../node_modules/@angular/http';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'trips', component: TripsComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TripsComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    DialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
