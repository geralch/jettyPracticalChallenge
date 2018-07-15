import { Component } from '@angular/core';
import { HTTPCallsService } from './services/httpcalls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLogged: boolean = false;
  title = 'Jetty Practical Challenge | Geraldine Caicedo';

  constructor(private service: HTTPCallsService,
    private router: Router) {
    let autorization = localStorage.getItem('Authorization');
    if (autorization != null) {
      this.router.navigate(['/home'])
    }
  }

  checkIfLogged() {
    let autorization = localStorage.getItem('Authorization');
    if (autorization == null) {
      this.isLogged = false
    } else {
      this.isLogged = true
    }
    return this.isLogged
  }

  loginOut() {
    this.service.logOutRequest()
    this.router.navigate(['/'])
    this.isLogged = false;
  }
}
