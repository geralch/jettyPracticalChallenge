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
    let errorCode = localStorage.getItem('ErrorCode');
    if (autorization != null) {
      this.router.navigate(['/home'])
    } else {
      this.router.navigate(['/'])
    }
    if (errorCode != null) {
      this.router.navigate(['/'])
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
