import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes , RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { TripsComponent } from './trips/trips.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '../../node_modules/@angular/http';
import { ErrorsComponent } from './errors/errors.component';
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'trips', component: TripsComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TripsComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule, 
    InputTextModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
